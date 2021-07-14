export default [
    {
        id: 'stage-1',
        name: 'Awareness',
        description: 'That there are premium channels',
        type: 'stage',
        milestones: [
            {
                id: 'milestone-1',
                name: 'Viewing the Premium Channel website',
                description: 'milestone description',
                type: 'milestone',
                experiences: [
                    {
                        id: 'experience-1',
                        name: 'Personalized Channel Website Journey',
                        description: 'experience description',
                        type: 'experience',
                        exposures: [
                            {
                                id: 'exposure-1',
                                name: 'Initial email to view webpage',
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                            {
                                id: 'exposure-2',
                                name: `Follow-up email to view webpage if they didn't already clickthrough`,
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                        ]
                    },
                    {
                        id: 'experience-2',
                        name: 'Premium Channel Amplification',
                        description: 'experience description',
                        type: 'experience',
                        exposures: [
                            {
                                id: 'exposure-2-1',
                                name: 'Paid Media personalization channel promotion',
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                            {
                                id: 'exposure-2-2',
                                name: 'Influencer ad post on Instagram',
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                        ]
                    }
                ]
            },
            {
                id: 'milestone-2',
                name: 'Watch premium channel trailer',
                description: 'milestone description',
                type: 'milestone',
                experiences: [
                    {
                        id: 'experience-3',
                        name: 'Premium Trailer Activation',
                        description: 'experience description',
                        type: 'experience',
                        exposures: [
                            {
                                id: 'exposure-3-1',
                                name: 'Custom web banner with trailer promo',
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                            {
                                id: 'exposure-3-2',
                                name: `Push notifications to watch new premium channel trailer`,
                                description: 'exposure description',
                                duration: 3,
                                type: 'exposure',
                            },
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 'stage-2',
        name: 'Offering',
        description: 'Giving particular ones based on engagement with broader awareness ("offers")',
        type: 'stage',
        milestones: []
    },
    {
        id: 'stage-3',
        name: 'Convert',
        description: 'Purchase and onboard channel',
        type: 'stage',
        milestones: [
            {
                id: 'milestone-3',
                name: 'Viewing the Premium Channel website',
                description: 'milestone description',
                type: 'milestone',
                experiences: [],
            },
        ]
    },
    {
        id: 'stage-4',
        name: 'Retain',
        description: 'Recommend content based on engagement with other channels or base package, Push content based on low usage',
        type: 'stage',
        milestones: []
    },
];