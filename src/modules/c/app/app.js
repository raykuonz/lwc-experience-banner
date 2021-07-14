import { LightningElement } from 'lwc';

import MOCK_DATA from './data';

const arrayReplace = (array, index = 0, itemToReplace) => {
    return [
        ...array.slice(0, index),
        itemToReplace,
        ...array.slice(index + 1, array.length),
    ]
}

const arrayRemove = (array, index = 0) => {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length),
    ]
}

export default class App extends LightningElement {
    state = MOCK_DATA;

    recordData = null;

    get stages() {
        return this.state.map((stage, index) => {

            const milestones = stage.milestones.map((milestone) => {
                return {
                    ...milestone,
                    experiences: this.decorateExperiences(milestone.experiences),
                    hasExperience: milestone.experiences.length > 0,
                }
            })

            return {
                ...stage,
                milestones,
                hasMilestones: milestones.length > 0,
                count: index + 1,
            }
        });
    }

    decorateExperiences(experiences) {

        if (!experiences || experiences.length <= 1) {
            return experiences;
        }

        const decoratedExperiences = experiences.map((experience, index) => {
            let pos = 'center';

            if (index === 0) {
                pos = 'left';
            } else if (index === experiences.length - 1) {
                pos = 'right';
            }

            return {
                ...experience,
                pos,
            }
        });

        return decoratedExperiences;
    }

    addStage({ name, description, id }) {
        this.state = [
            ...this.state,
            {
                id,
                name,
                description,
                milestones: [],
            }
        ]
    }

    addMilestone({ name, description, id, stageId }) {
        this.state = [
            ...this.state.slice(0, stageId),
            {
                ...this.state[stageId],
                milestones: [
                    ...this.state[stageId].milestones,
                    {
                        id,
                        name,
                        description,
                        experiences: [],
                    }
                ]
            },
            ...this.state.slice(stageId + 1, this.state.length)
        ];
    }

    addExperience({ name, description, id, stageId, milestoneId }) {
        const milestones = this.state[stageId].milestones;

        this.state = [
            ...this.state.slice(0, stageId),
            {
                ...this.state[stageId],
                milestones: [
                    ...milestones.slice(0, milestoneId),
                    {
                        ...milestones[milestoneId],
                        experiences: [
                            ...milestones[milestoneId].experiences,
                            {
                                id,
                                name,
                                description,
                                exposures: [],
                            }
                        ]
                    },
                    ...milestones.slice(milestoneId + 1, milestones.length),
                ]
            },
            ...this.state.slice(stageId + 1, this.state.length)
        ];
    }

    addExposure({ name, description, id, stageId, milestoneId, experienceId}) {

        const milestones = this.state[stageId].milestones;
        const experiences = this.state[stageId].milestones[milestoneId].experiences;

        this.state = [
            ...this.state.slice(0, stageId),
            {
                ...this.state[stageId],
                milestones: [
                    ...milestones.slice(0, milestoneId),
                    {
                        ...milestones[milestoneId],
                        experiences: [
                            ...experiences.slice(0, experienceId),
                            {
                                ...experiences[experienceId],
                                exposures: [
                                    ...experiences[experienceId].exposures,
                                    {
                                        id,
                                        name,
                                        description,
                                        hours: 5,
                                    }
                                ]
                            },
                            ...experiences.slice(experienceId + 1, experiences.length),
                        ]
                    },
                    ...milestones.slice(milestoneId + 1, milestones.length),
                ]
            },
            ...this.state.slice(stageId + 1, this.state.length)
        ];
    }

    editStage({ name, description, stageId }) {
        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            name,
            description
        });
    }

    editMilestone({ name, description, stageId, milestoneId }) {
        const milestones = arrayReplace(this.state[stageId].milestones, milestoneId, {
            ...this.state[stageId].milestones[milestoneId],
            name,
            description,
        });

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    editExperience({ name, description, stageId, milestoneId, experienceId }) {

        const experiences = arrayReplace(this.state[stageId].milestones[milestoneId].experiences, experienceId, {
            ...this.state[stageId].milestones[milestoneId].experiences[experienceId],
            name,
            description
        });

        const milestones = arrayReplace(this.state[stageId].milestones, milestoneId, {
            ...this.state[stageId].milestones[milestoneId],
            experiences,
        });

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    editExposure({ name, description, stageId, milestoneId, experienceId, exposureId }) {
        const exposures = arrayReplace(this.state[stageId].milestones[milestoneId].experiences[experienceId].exposures, exposureId, {
            ...this.state[stageId].milestones[milestoneId].experiences[experienceId].exposures[exposureId],
            name,
            description
        });

        const experiences = arrayReplace(this.state[stageId].milestones[milestoneId].experiences, experienceId, {
            ...this.state[stageId].milestones[milestoneId].experiences[experienceId],
            exposures,
        });

        const milestones = arrayReplace(this.state[stageId].milestones, milestoneId, {
            ...this.state[stageId].milestones[milestoneId],
            experiences,
        });

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    deleteStage({ stageId }) {
        this.state = arrayRemove(this.state, stageId);
    }

    deleteMilestone({ stageId, milestoneId }) {
        const milestones = arrayRemove(this.state[stageId].milestones, milestoneId);

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    deleteExperience({ stageId, milestoneId, experienceId }) {
        const experiences = arrayRemove(this.state[stageId].milestones[milestoneId].experiences, experienceId);

        const milestones = arrayReplace(this.state[stageId].milestones, milestoneId, {
            ...this.state[stageId].milestones[milestoneId],
            experiences,
        });

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    deleteExposure({ stageId, milestoneId, experienceId, exposureId }) {
        const exposures = arrayRemove(this.state[stageId].milestones[milestoneId].experiences[experienceId].exposures, exposureId);

        const experiences = arrayReplace(this.state[stageId].milestones[milestoneId].experiences, experienceId, {
            ...this.state[stageId].milestones[milestoneId].experiences[experienceId],
            exposures,
        });

        const milestones = arrayReplace(this.state[stageId].milestones, milestoneId, {
            ...this.state[stageId].milestones[milestoneId],
            experiences,
        });

        this.state = arrayReplace(this.state, stageId, {
            ...this.state[stageId],
            milestones,
        });
    }

    handleAddStage(event) {
        event.stopPropagation();
        this.recordData = {
            type: 'stage',
        }
    }

    handleAddMilestone(event) {
        event.stopPropagation();
        const { stageId } = event.target.dataset;
        this.recordData = {
            type: 'milestone',
            stageId: parseInt(stageId),
        }
    }

    handleAddExperience(event) {
        event.stopPropagation();
        const { stageId, milestoneId } = event.target.dataset;
        this.recordData = {
            type: 'experience',
            stageId: parseInt(stageId),
            milestoneId: parseInt(milestoneId),
        }
    }

    handleAddExposure(event) {
        event.stopPropagation();
        const { stageId, milestoneId, experienceId } = event.target.dataset;
        this.recordData = {
            type: 'exposure',
            stageId: parseInt(stageId),
            milestoneId: parseInt(milestoneId),
            experienceId: parseInt(experienceId),
        }
    }

    handleEditStage(event) {
        event.stopPropagation();
        const { stageId } = event.currentTarget.dataset;
        const { name, description } = this.state[stageId];
        this.recordData = {
            type: 'stage',
            isEdit: true,
            stageId: parseInt(stageId),
            name,
            description,
        }
    }

    handleEditMilestone(event) {
        event.stopPropagation();
        const { stageId, milestoneId } = event.currentTarget.dataset;
        const { name, description } = this.state[stageId].milestones[milestoneId];
        this.recordData = {
            type: 'milestone',
            isEdit: true,
            stageId: parseInt(stageId),
            milestoneId: parseInt(milestoneId),
            name,
            description,
        }
    }

    handleEditExperience(event) {
        event.stopPropagation();
        const { stageId, milestoneId, experienceId } = event.currentTarget.dataset;
        const { name, description } = this.state[stageId].milestones[milestoneId].experiences[experienceId];
        this.recordData = {
            type: 'experience',
            isEdit: true,
            stageId: parseInt(stageId),
            milestoneId: parseInt(milestoneId),
            experienceId: parseInt(experienceId),
            name,
            description,
        }
    }

    handleEditExposure(event) {
        event.stopPropagation();
        const { stageId, milestoneId, experienceId, exposureId } = event.currentTarget.dataset;
        const { name, description } = this.state[stageId].milestones[milestoneId].experiences[experienceId].exposures[exposureId];
        this.recordData = {
            type: 'exposure',
            isEdit: true,
            stageId: parseInt(stageId),
            milestoneId: parseInt(milestoneId),
            experienceId: parseInt(experienceId),
            exposureId: parseInt(exposureId),
            name,
            description,
        }
    }

    handleCancel() {
        this.recordData = null;
    }

    handleSave(event) {
        const detail = event.detail;
        if (detail.isEdit) {
            switch (detail.type) {
                case 'stage':
                    this.editStage(detail);
                    break;
                case 'milestone':
                    this.editMilestone(detail);
                    break;
                case 'experience':
                    this.editExperience(detail);
                    break;
                case 'exposure':
                    this.editExposure(detail);
                    break;
                default:
                    break;
            }
        } else {
            switch (detail.type) {
                case 'stage':
                    this.addStage(detail);
                    break;
                case 'milestone':
                    this.addMilestone(detail);
                    break;
                case 'experience':
                    this.addExperience(detail);
                    break;
                case 'exposure':
                    this.addExposure(detail);
                    break;
                default:
                    break;
            }
        }
        this.recordData = null;
    }

    handleDelete(event) {
        const detail = event.detail;
        switch (detail.type) {
            case 'stage':
                this.deleteStage(detail);
                break;
            case 'milestone':
                this.deleteMilestone(detail);
                break;
            case 'experience':
                this.deleteExperience(detail);
                break;
            case 'exposure':
                this.deleteExposure(detail);
                break;
            default:
                break;
        }
        this.recordData = null;
    }

    handleClearData() {
        this.state = [];
    }

    handleStageDragStart(event) {
        event.dataTransfer.effectAllowed = 'move';

        const stageId = parseInt(event.target.dataset.stageId);
        const x = event.clientX;
        const y = event.clientY;

        console.log('x', x);
        console.log('y', y);
        // event.dataTransfer.setData('application/c-app', stageId);

        console.log(' this.template.elementFromPoint(x, y)',  this.template.elementFromPoint(x, y));

        // this.template.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    }

}
