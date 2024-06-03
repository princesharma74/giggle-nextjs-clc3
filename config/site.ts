
export type SiteConfig = typeof siteConfig

export const siteConfig = {
    "user": {
        "name" : "Prince Sharma", 
        "username" : "princesharma74", 
        "email" : "princesharma2899@gmail.com", 
        "profile" : "https://i.ibb.co/jTSDpzR/Presentation1.png"
    },
    "nav-options": [
        {
            "label" : "Home", 
            "active" : false,
            "href" : "/"
        }, 
        {
            "label" : "Friends", 
            "active" : false,
            "href" : "/friends"
        },
        {
            "label" : "Upcoming Contests", 
            "active" : false,
            "href" : "/contests"
        },
        {
            "label" : "Settings", 
            "active" : false,
            "href" : "/edit-profile"
        },
        // {
        //     "label" : "Report an Issue", 
        //     "active" : false,
        //     "href" : "/report"
        // }
    ]
}

/*
export const rooms: Room[] = [
    {
        id : 1,
        title: "Codechef Contest Discussion",
        description: "This room is intended to discuss the recent contests questions in codechef contests",
        participants: [
            {
                name : "Prince Sharma", 
                username : "princesharma74", 
                email : "princesharma2899@gmail.com", 
                profile : "https://i.ibb.co/jTSDpzR/Presentation1.png"
            },
            {
                name : "Shivam Gupta", 
                username : "coder_s_176", 
                email : "princesharma2899@gmail.com", 
                profile : "https://i.ibb.co/jTSDpzR/Presentation1.png"
            }
        ],
        topics: [
            {
                id: 1, 
                name: "Discussion"
            },
            {
                id: 2, 
                name: "Contests"
            }
        ], 
        host: {
                name : "Prince Sharma", 
                username : "princesharma74", 
                email : "princesharma2899@gmail.com", 
                profile : "https://i.ibb.co/jTSDpzR/Presentation1.png"
        }, 
        createAt: new Date('2023-12-17T03:24:00')
    },
    {
        id : 2,
        title: "React Developers Hangout",
        description: "A place for React developers to discuss best practices, libraries, and share projects.",
        participants: [
            {
                name : "Emily Smith", 
                username : "emily_dev", 
                email : "emily@example.com", 
                profile : "https://example.com/emily_profile.png"
            },
            {
                name : "Max Johnson", 
                username : "max_dev", 
                email : "max@example.com", 
                profile : "https://example.com/max_profile.png"
            }
        ],
        topics: [
            {
                id: 1, 
                name: "Best Practices"
            },
            {
                id: 2, 
                name: "Project Showcase"
            }
        ], 
        host: {
                name : "Emily Smith", 
                username : "emily_dev", 
                email : "emily@example.com", 
                profile : "https://example.com/emily_profile.png"
        }, 
        createAt: new Date('2024-01-10T10:45:00')
    },
    {
        id : 3,
        title: "Data Science Q&A",
        description: "A room dedicated to answering questions related to data science concepts, tools, and techniques.",
        participants: [
            {
                name : "Sophia Lee", 
                username : "sophia_ds", 
                email : "sophia@example.com", 
                profile : "https://example.com/sophia_profile.png"
            },
            {
                name : "Daniel Kim", 
                username : "daniel_ds", 
                email : "daniel@example.com", 
                profile : "https://example.com/daniel_profile.png"
            }
        ],
        topics: [
            {
                id: 1, 
                name: "Machine Learning"
            },
            {
                id: 2, 
                name: "Data Visualization"
            }
        ], 
        host: {
                name : "Sophia Lee", 
                username : "sophia_ds", 
                email : "sophia@example.com", 
                profile : "https://example.com/sophia_profile.png"
        }, 
        createAt: new Date('2024-02-20T14:30:00')
    },
    {
        id : 4,
        title: "Web Development Bootcamp",
        description: "Join this room to participate in a comprehensive web development bootcamp covering HTML, CSS, and JavaScript.",
        participants: [
            {
                name : "Alex Johnson", 
                username : "alex_dev", 
                email : "alex@example.com", 
                profile : "https://example.com/alex_profile.png"
            },
            {
                name : "Emma Wilson", 
                username : "emma_dev", 
                email : "emma@example.com", 
                profile : "https://example.com/emma_profile.png"
            }
        ],
        topics: [
            {
                id: 1, 
                name: "HTML"
            },
            {
                id: 2, 
                name: "CSS"
            },
            {
                id: 3,
                name: "JavaScript"
            }
        ], 
        host: {
                name : "Alex Johnson", 
                username : "alex_dev", 
                email : "alex@example.com", 
                profile : "https://example.com/alex_profile.png"
        }, 
        createAt: new Date('2024-03-05T09:00:00')
    },
    {
        id : 5,
        title: "AI Ethics Discussion",
        description: "Engage in discussions about the ethical implications of artificial intelligence and machine learning technologies.",
        participants: [
            {
                name : "Olivia Brown", 
                username : "olivia_ai", 
                email : "olivia@example.com", 
                profile : "https://example.com/olivia_profile.png"
            },
            {
                name : "Liam Miller", 
                username : "liam_ai", 
                email : "liam@example.com", 
                profile : "https://example.com/liam_profile.png"
            }
        ],
        topics: [
            {
                id: 1, 
                name: "Bias in AI"
            },
            {
                id: 2, 
                name: "Privacy Concerns"
            }
        ], 
        host: {
                name : "Olivia Brown", 
                username : "olivia_ai", 
                email : "olivia@example.com", 
                profile : "https://example.com/olivia_profile.png"
        }, 
        createAt: new Date('2024-04-02T15:20:00')
    },
];

export const topics : Topic[] = [
    {
        id: 1, 
        name: "Discussion"
    },
    {
        id: 2,
        name: "Contests"
    },
    {
        id: 3,
        name: "Best Practices"
    },
    {
        id: 4,
        name: "Project Showcase"
    },
    {
        id: 5,
        name: "Machine Learning"
    },
    {
        id: 6,
        name: "Data Visualization"
    },
    {
        id: 7,
        name: "HTML"
    },
    {
        id: 8,
        name: "CSS"
    },
    {
        id: 9,
        name: "JavaScript"
    },
    {
        id: 10,
        name: "Bias in AI"
    },
    {
        id: 11,
        name: "Privacy Concerns"
    }
];

export const contests : Contest[] = [
    {
        title: "Codeforces Round #734 (Div. 3)",
        time: new Date('2024-04-02T15:20:00'),
        link: "https://codeforces.com/contest/1553",
        platform: "Codeforces"
    },
    {
        title: "April Long Challenge 2024",
        time: new Date('2024-04-02T15:20:00'),
        link: "https://www.codechef.com/APRIL24",
        platform: "Codechef"
    },
    {
        title: "Weekly Contest 283",
        time: new Date('2024-04-02T15:20:00'),
        link: "https://leetcode.com/contest/weekly-contest-283",
        platform: "Leetcode"
    }
]
*/