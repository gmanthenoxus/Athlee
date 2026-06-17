module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Athlee/apps/web/src/lib/basketballConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASKETBALL_CONFIG",
    ()=>BASKETBALL_CONFIG,
    "BASKETBALL_MATCH_TYPES",
    ()=>BASKETBALL_MATCH_TYPES,
    "BASKETBALL_MATCH_TYPES_CONFIG",
    ()=>BASKETBALL_MATCH_TYPES_CONFIG,
    "BASKETBALL_POSITIONS",
    ()=>BASKETBALL_POSITIONS,
    "BASKETBALL_RULE_PRESETS",
    ()=>BASKETBALL_RULE_PRESETS,
    "BASKETBALL_STAT_INTENSITIES",
    ()=>BASKETBALL_STAT_INTENSITIES,
    "BASKETBALL_TEAM_SIZES",
    ()=>BASKETBALL_TEAM_SIZES,
    "BEST_OF_SUBTYPE",
    ()=>BEST_OF_SUBTYPE,
    "FIBA_PRESET",
    ()=>FIBA_PRESET,
    "HORSE_SUBTYPE",
    ()=>HORSE_SUBTYPE,
    "NBA_PRESET",
    ()=>NBA_PRESET,
    "NCAA_PRESET",
    ()=>NCAA_PRESET,
    "ROTATIONAL_TYPE",
    ()=>ROTATIONAL_TYPE,
    "SET_BASED_TYPE",
    ()=>SET_BASED_TYPE,
    "SINGLE_GAME_TYPE",
    ()=>SINGLE_GAME_TYPE,
    "STREETBALL_PRESET",
    ()=>STREETBALL_PRESET,
    "TOURNAMENT_TYPE",
    ()=>TOURNAMENT_TYPE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const BASKETBALL_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Game',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Best of...',
        enabled: true,
        description: 'Multiple sets or rounds'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational,
        label: 'Rotational',
        enabled: false,
        description: 'Rotating players'
    }
];
const BASKETBALL_TEAM_SIZES = [
    {
        label: '5v5',
        playersPerTeam: 5,
        substitutes: 7
    },
    {
        label: '3v3',
        playersPerTeam: 3,
        substitutes: 2
    },
    {
        label: '2v2',
        playersPerTeam: 2,
        substitutes: 1
    },
    {
        label: '1v1',
        playersPerTeam: 1,
        substitutes: 0
    }
];
const BASKETBALL_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const BASKETBALL_POSITIONS = [
    'PG',
    'SG',
    'SF',
    'PF',
    'C'
];
const FIBA_PRESET = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASKETBALL_PRESETS"][0];
const NBA_PRESET = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASKETBALL_PRESETS"][1];
const NCAA_PRESET = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASKETBALL_PRESETS"][2];
const STREETBALL_PRESET = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASKETBALL_PRESETS"][3];
const BASKETBALL_RULE_PRESETS = [
    FIBA_PRESET,
    NBA_PRESET,
    NCAA_PRESET,
    STREETBALL_PRESET
];
const SINGLE_GAME_TYPE = {
    id: 'single',
    name: 'Single Game',
    description: 'A standalone pickup game with final score',
    icon: '🏀',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: '5v5',
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic
};
const HORSE_SUBTYPE = {
    id: 'horse',
    name: 'H.O.R.S.E.',
    description: 'Players replicate trick shots - first to spell the word loses',
    icon: '🎯',
    enabled: true,
    requiresTeamSize: false,
    fixedTeamSize: '1v1',
    requiresStatIntensity: false
};
const BEST_OF_SUBTYPE = {
    id: 'best-of',
    name: 'Best of Series',
    description: 'Best of 3 or 5 games',
    icon: '🏆',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    requiresBestOf: true,
    defaultBestOf: 3
};
const SET_BASED_TYPE = {
    id: 'set-based',
    name: 'Set-Based Challenges',
    description: 'A series of mini-games or challenges',
    icon: '🎪',
    enabled: true,
    requiresTeamSize: false,
    requiresStatIntensity: false,
    subtypes: [
        HORSE_SUBTYPE,
        BEST_OF_SUBTYPE
    ]
};
const TOURNAMENT_TYPE = {
    id: 'tournament',
    name: 'Tournament',
    description: 'Structured bracket or league play',
    icon: '🏆',
    enabled: false,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    tooltip: 'Coming soon',
    subtypes: [
        {
            id: 'single-elim',
            name: 'Single Elimination',
            description: 'Lose once and you\'re out',
            enabled: false,
            requiresTeamSize: true,
            requiresStatIntensity: true,
            tooltip: 'Coming soon'
        },
        {
            id: 'double-elim',
            name: 'Double Elimination',
            description: 'Lose twice and you\'re out',
            enabled: false,
            requiresTeamSize: true,
            requiresStatIntensity: true,
            tooltip: 'Coming soon'
        },
        {
            id: 'round-robin',
            name: 'Round Robin',
            description: 'Everyone plays everyone',
            enabled: false,
            requiresTeamSize: true,
            requiresStatIntensity: true,
            tooltip: 'Coming soon'
        }
    ]
};
const ROTATIONAL_TYPE = {
    id: 'rotational',
    name: 'Rotational',
    description: 'Winner stays on or rotating players',
    icon: '🔄',
    enabled: false,
    requiresTeamSize: true,
    requiresStatIntensity: false,
    tooltip: 'Coming soon',
    subtypes: [
        {
            id: 'king-court',
            name: 'King of the Court',
            description: 'Winning team stays on the court',
            enabled: false,
            requiresTeamSize: true,
            fixedTeamSize: '3v3',
            requiresStatIntensity: false,
            tooltip: 'Coming soon'
        },
        {
            id: 'chicago',
            name: 'Chicago',
            description: 'First to 21 with rotating team formation',
            enabled: false,
            requiresTeamSize: false,
            fixedTeamSize: '3v3',
            requiresStatIntensity: false,
            tooltip: 'Coming soon'
        },
        {
            id: 'timed',
            name: 'Timed Rotations',
            description: 'Rotate teams on a timer',
            enabled: false,
            requiresTeamSize: true,
            requiresStatIntensity: false,
            tooltip: 'Coming soon'
        }
    ]
};
const BASKETBALL_MATCH_TYPES_CONFIG = [
    SINGLE_GAME_TYPE,
    SET_BASED_TYPE,
    TOURNAMENT_TYPE,
    ROTATIONAL_TYPE
];
const BASKETBALL_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
    enabled: true,
    icon: '🏀',
    displayName: 'Basketball',
    description: '5v5, 3v3, 2v2, or 1v1 matches',
    matchTypes: BASKETBALL_MATCH_TYPES,
    teamSizeOptions: BASKETBALL_TEAM_SIZES,
    statIntensities: BASKETBALL_STAT_INTENSITIES,
    rulePresets: BASKETBALL_RULE_PRESETS,
    positions: BASKETBALL_POSITIONS,
    // New field for match type configuration (Step 2)
    matchTypeConfigs: BASKETBALL_MATCH_TYPES_CONFIG
};
}),
"[project]/Athlee/apps/web/src/lib/soccerConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SOCCER_CONFIG",
    ()=>SOCCER_CONFIG,
    "SOCCER_MATCH_TYPES",
    ()=>SOCCER_MATCH_TYPES,
    "SOCCER_MATCH_TYPES_CONFIG",
    ()=>SOCCER_MATCH_TYPES_CONFIG,
    "SOCCER_POSITIONS",
    ()=>SOCCER_POSITIONS,
    "SOCCER_SINGLE_GAME_TYPE",
    ()=>SOCCER_SINGLE_GAME_TYPE,
    "SOCCER_STAT_INTENSITIES",
    ()=>SOCCER_STAT_INTENSITIES,
    "SOCCER_TEAM_SIZES",
    ()=>SOCCER_TEAM_SIZES,
    "SOCCER_TOURNAMENT_TYPE",
    ()=>SOCCER_TOURNAMENT_TYPE
]);
/**
 * Soccer (Football) Sport Configuration
 * 
 * Comprehensive configuration for soccer matches including:
 * - Team size options (11v11, 7v7, 5v5, 3v3)
 * - Match type configurations (Single Game focus, with placeholders for Tournament)
 * - Rule presets (FIFA Standard, Youth, Indoor, Custom)
 * - Player positions (GK, DEF, MID, FWD)
 * - Stat tracking intensities (Basic, Advanced)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockSoccerRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockSoccerRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const SOCCER_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Game',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Best of...',
        enabled: false,
        description: 'Multiple matches in series'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational,
        label: 'Rotational',
        enabled: false,
        description: 'Rotating players (coming soon)'
    }
];
const SOCCER_TEAM_SIZES = [
    {
        label: '11v11',
        playersPerTeam: 11,
        substitutes: 7
    },
    {
        label: '7v7',
        playersPerTeam: 7,
        substitutes: 5
    },
    {
        label: '5v5',
        playersPerTeam: 5,
        substitutes: 3
    },
    {
        label: '3v3',
        playersPerTeam: 3,
        substitutes: 2
    }
];
const SOCCER_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const SOCCER_POSITIONS = [
    'GK',
    'DEF',
    'MID',
    'FWD'
];
const SOCCER_SINGLE_GAME_TYPE = {
    id: 'single',
    name: 'Single Game',
    description: 'A standalone pickup soccer match with final score',
    icon: '⚽',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: '5v5',
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic
};
const SOCCER_TOURNAMENT_TYPE = {
    id: 'tournament',
    name: 'Tournament',
    description: 'Structured tournament bracket play',
    icon: '🏆',
    enabled: false,
    tooltip: 'Coming soon',
    requiresTeamSize: true,
    requiresStatIntensity: true
};
const SOCCER_MATCH_TYPES_CONFIG = [
    SOCCER_SINGLE_GAME_TYPE,
    SOCCER_TOURNAMENT_TYPE
];
const SOCCER_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
    enabled: true,
    icon: '⚽',
    displayName: 'Soccer',
    description: '11v11, 7v7, 5v5, or 3v3 matches with comprehensive stat tracking',
    matchTypes: SOCCER_MATCH_TYPES,
    matchTypeConfigs: SOCCER_MATCH_TYPES_CONFIG,
    teamSizeOptions: SOCCER_TEAM_SIZES,
    statIntensities: SOCCER_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockSoccerRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SOCCER_PRESETS"],
    positions: SOCCER_POSITIONS
};
}),
"[project]/Athlee/apps/web/src/lib/tennisConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TENNIS_CONFIG",
    ()=>TENNIS_CONFIG,
    "TENNIS_MATCH_TYPES",
    ()=>TENNIS_MATCH_TYPES,
    "TENNIS_SINGLE_GAME_TYPE",
    ()=>TENNIS_SINGLE_GAME_TYPE,
    "TENNIS_STAT_INTENSITIES",
    ()=>TENNIS_STAT_INTENSITIES,
    "TENNIS_TEAM_SIZES",
    ()=>TENNIS_TEAM_SIZES
]);
/**
 * Tennis Sport Configuration
 * 
 * Comprehensive configuration for tennis matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (Standard, No-Ad, Fast4, Best of 5, Recreational, Custom)
 * - Stat tracking intensities (Basic, Advanced)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockTennisRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockTennisRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const TENNIS_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Match',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Set-Based',
        enabled: false,
        description: 'Multiple matches in series (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    }
];
const TENNIS_TEAM_SIZES = [
    {
        label: 'Singles (1v1)',
        playersPerTeam: 1,
        substitutes: 0
    },
    {
        label: 'Doubles (2v2)',
        playersPerTeam: 2,
        substitutes: 0
    }
];
const TENNIS_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const TENNIS_SINGLE_GAME_TYPE = {
    id: 'single',
    name: 'Single Match',
    description: 'A single tennis match (best of 3 or 5 sets)',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: 'Singles (1v1)',
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic
};
const TENNIS_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis,
    enabled: true,
    icon: '🎾',
    displayName: 'Tennis',
    description: 'Racket sport played on courts with singles and doubles formats',
    matchTypes: TENNIS_MATCH_TYPES,
    matchTypeConfigs: [
        TENNIS_SINGLE_GAME_TYPE
    ],
    teamSizeOptions: TENNIS_TEAM_SIZES,
    statIntensities: TENNIS_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockTennisRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TENNIS_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/badmintonConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BADMINTON_CONFIG",
    ()=>BADMINTON_CONFIG,
    "BADMINTON_MATCH_TYPES",
    ()=>BADMINTON_MATCH_TYPES,
    "BADMINTON_SINGLE_GAME_TYPE",
    ()=>BADMINTON_SINGLE_GAME_TYPE,
    "BADMINTON_STAT_INTENSITIES",
    ()=>BADMINTON_STAT_INTENSITIES,
    "BADMINTON_TEAM_SIZES",
    ()=>BADMINTON_TEAM_SIZES
]);
/**
 * Badminton Sport Configuration
 * 
 * Comprehensive configuration for badminton matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (BWF Standard, 15-point, 11-point, Single Game, Recreational, Custom)
 * - Stat tracking intensities (Basic, Advanced)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBadmintonRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockBadmintonRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const BADMINTON_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Match',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Set-Based',
        enabled: false,
        description: 'Multiple matches in series (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    }
];
const BADMINTON_TEAM_SIZES = [
    {
        label: 'Singles (1v1)',
        playersPerTeam: 1,
        substitutes: 0
    },
    {
        label: 'Doubles (2v2)',
        playersPerTeam: 2,
        substitutes: 0
    }
];
const BADMINTON_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const BADMINTON_SINGLE_GAME_TYPE = {
    id: 'single',
    name: 'Single Match',
    description: 'A single badminton match (best of 3 games)',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: 'Singles (1v1)',
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic
};
const BADMINTON_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Badminton,
    enabled: true,
    icon: '🏸',
    displayName: 'Badminton',
    description: 'Racket sport played on courts with singles and doubles formats, rally scoring',
    matchTypes: BADMINTON_MATCH_TYPES,
    matchTypeConfigs: [
        BADMINTON_SINGLE_GAME_TYPE
    ],
    teamSizeOptions: BADMINTON_TEAM_SIZES,
    statIntensities: BADMINTON_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBadmintonRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BADMINTON_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/pickleballConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PICKLEBALL_CONFIG",
    ()=>PICKLEBALL_CONFIG,
    "PICKLEBALL_MATCH_TYPES",
    ()=>PICKLEBALL_MATCH_TYPES,
    "PICKLEBALL_SINGLE_GAME_TYPE",
    ()=>PICKLEBALL_SINGLE_GAME_TYPE,
    "PICKLEBALL_STAT_INTENSITIES",
    ()=>PICKLEBALL_STAT_INTENSITIES,
    "PICKLEBALL_TEAM_SIZES",
    ()=>PICKLEBALL_TEAM_SIZES
]);
/**
 * Pickleball Sport Configuration
 * 
 * Comprehensive configuration for pickleball matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (USAPA Standard, 15/21-point, Quick Play, Recreational, Custom)
 * - Stat tracking intensities (Basic, Advanced)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockPickleballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockPickleballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const PICKLEBALL_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Match',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Set-Based',
        enabled: false,
        description: 'Multiple matches in series (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    }
];
const PICKLEBALL_TEAM_SIZES = [
    {
        label: 'Singles (1v1)',
        playersPerTeam: 1,
        substitutes: 0
    },
    {
        label: 'Doubles (2v2)',
        playersPerTeam: 2,
        substitutes: 0
    }
];
const PICKLEBALL_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const PICKLEBALL_SINGLE_GAME_TYPE = {
    id: 'single',
    name: 'Single Match',
    description: 'A single pickleball match (best of 3 games)',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: 'Singles (1v1)',
    defaultStatIntensity: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic
};
const PICKLEBALL_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Pickleball,
    enabled: true,
    icon: '🏓',
    displayName: 'Pickleball',
    description: 'Rapidly growing racket sport with rally scoring, played on small courts',
    matchTypes: PICKLEBALL_MATCH_TYPES,
    matchTypeConfigs: [
        PICKLEBALL_SINGLE_GAME_TYPE
    ],
    teamSizeOptions: PICKLEBALL_TEAM_SIZES,
    statIntensities: PICKLEBALL_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockPickleballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PICKLEBALL_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/volleyballConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VOLLEYBALL_CONFIG",
    ()=>VOLLEYBALL_CONFIG,
    "VOLLEYBALL_MATCH_TYPES",
    ()=>VOLLEYBALL_MATCH_TYPES,
    "VOLLEYBALL_STAT_INTENSITIES",
    ()=>VOLLEYBALL_STAT_INTENSITIES,
    "VOLLEYBALL_TEAM_SIZES",
    ()=>VOLLEYBALL_TEAM_SIZES
]);
/**
 * Volleyball Sport Configuration
 * 
 * Defines volleyball-specific match settings, team sizes, and rule presets
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockVolleyballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const VOLLEYBALL_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Match',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Best of Series',
        enabled: true,
        description: 'Multiple matches in series'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational,
        label: 'Rotational',
        enabled: false,
        description: 'Rotating players (coming soon)'
    }
];
const VOLLEYBALL_TEAM_SIZES = [
    {
        label: '6v6 (Indoor)',
        playersPerTeam: 6,
        substitutes: 6
    },
    {
        label: '2v2 (Beach)',
        playersPerTeam: 2,
        substitutes: 2
    }
];
const VOLLEYBALL_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const VOLLEYBALL_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
    enabled: true,
    icon: '🏐',
    displayName: 'Volleyball',
    description: 'Indoor and beach volleyball with comprehensive stat tracking',
    matchTypes: VOLLEYBALL_MATCH_TYPES,
    teamSizeOptions: VOLLEYBALL_TEAM_SIZES,
    statIntensities: VOLLEYBALL_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLLEYBALL_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/baseballConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASEBALL_CONFIG",
    ()=>BASEBALL_CONFIG,
    "BASEBALL_MATCH_TYPES",
    ()=>BASEBALL_MATCH_TYPES,
    "BASEBALL_STAT_INTENSITIES",
    ()=>BASEBALL_STAT_INTENSITIES,
    "BASEBALL_TEAM_SIZES",
    ()=>BASEBALL_TEAM_SIZES
]);
/**
 * Baseball Sport Configuration
 * 
 * Defines baseball-specific match settings, team sizes, and rule presets
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockBaseballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const BASEBALL_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Game',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Series',
        enabled: true,
        description: 'Multiple games in series'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational,
        label: 'Rotational',
        enabled: false,
        description: 'Rotating players (coming soon)'
    }
];
const BASEBALL_TEAM_SIZES = [
    {
        label: '9v9 (Full)',
        playersPerTeam: 9,
        substitutes: 6
    },
    {
        label: '7v7 (Small)',
        playersPerTeam: 7,
        substitutes: 3
    }
];
const BASEBALL_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const BASEBALL_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Baseball,
    enabled: true,
    icon: '⚾',
    displayName: 'Baseball',
    description: 'Baseball and softball with comprehensive stat tracking',
    matchTypes: BASEBALL_MATCH_TYPES,
    teamSizeOptions: BASEBALL_TEAM_SIZES,
    statIntensities: BASEBALL_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASEBALL_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/americanFootballConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AMERICAN_FOOTBALL_CONFIG",
    ()=>AMERICAN_FOOTBALL_CONFIG,
    "AMERICAN_FOOTBALL_MATCH_TYPES",
    ()=>AMERICAN_FOOTBALL_MATCH_TYPES,
    "AMERICAN_FOOTBALL_STAT_INTENSITIES",
    ()=>AMERICAN_FOOTBALL_STAT_INTENSITIES,
    "AMERICAN_FOOTBALL_TEAM_SIZES",
    ()=>AMERICAN_FOOTBALL_TEAM_SIZES
]);
/**
 * American Football Sport Configuration
 * 
 * Defines American football-specific match settings, team sizes, and rule presets
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockFootballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
const AMERICAN_FOOTBALL_MATCH_TYPES = [
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
        label: 'Single Game',
        enabled: true,
        description: 'One-off match with final score'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
        label: 'Series',
        enabled: true,
        description: 'Multiple games in series'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
        label: 'Tournament',
        enabled: false,
        description: 'Tournament bracket (coming soon)'
    },
    {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational,
        label: 'Rotational',
        enabled: false,
        description: 'Rotating players (coming soon)'
    }
];
const AMERICAN_FOOTBALL_TEAM_SIZES = [
    {
        label: '11v11 (Full)',
        playersPerTeam: 11,
        substitutes: 11
    },
    {
        label: '7v7 (Flag)',
        playersPerTeam: 7,
        substitutes: 3
    }
];
const AMERICAN_FOOTBALL_STAT_INTENSITIES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic,
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced
];
const AMERICAN_FOOTBALL_CONFIG = {
    sport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].American_Football,
    enabled: true,
    icon: '🏈',
    displayName: 'American Football',
    description: 'American football and flag football with comprehensive stat tracking',
    matchTypes: AMERICAN_FOOTBALL_MATCH_TYPES,
    teamSizeOptions: AMERICAN_FOOTBALL_TEAM_SIZES,
    statIntensities: AMERICAN_FOOTBALL_STAT_INTENSITIES,
    rulePresets: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOOTBALL_PRESETS"]
};
}),
"[project]/Athlee/apps/web/src/lib/sportConfigService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sportConfigService",
    ()=>sportConfigService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$basketballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/basketballConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$soccerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/soccerConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$tennisConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/tennisConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$badmintonConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/badmintonConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$pickleballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/pickleballConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$volleyballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/volleyballConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$baseballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/baseballConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$americanFootballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/americanFootballConfig.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * SportConfigService - Provides sport-specific configurations for the match setup wizard
 * Manages team sizes, rule presets, stat intensities, positions, and match types per sport
 */ class SportConfigService {
    sportConfigs;
    constructor(){
        this.sportConfigs = new Map();
        // Register all sport configurations
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$basketballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASKETBALL_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$soccerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SOCCER_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$tennisConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TENNIS_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$badmintonConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BADMINTON_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$pickleballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PICKLEBALL_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$volleyballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLLEYBALL_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$baseballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASEBALL_CONFIG"]);
        this.registerSportConfig(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$americanFootballConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AMERICAN_FOOTBALL_CONFIG"]);
    }
    /**
   * Register a sport configuration
   */ registerSportConfig(config) {
        this.sportConfigs.set(config.sport, config);
    }
    /**
   * Get configuration for a specific sport
   */ getConfig(sport) {
        return this.sportConfigs.get(sport) || null;
    }
    /**
   * Get all available sports (enabled and disabled)
   */ getAllSports() {
        return Array.from(this.sportConfigs.keys());
    }
    /**
   * Get all sport configurations
   */ getAllConfigs() {
        return Array.from(this.sportConfigs.values());
    }
    /**
   * Get only enabled sports (ready to use)
   */ getEnabledSports() {
        return this.getAllConfigs().filter((s)=>s.enabled);
    }
    /**
   * Get all sports for the sport picker (both enabled and disabled, so users can see what's coming)
   */ getSportsForPicker() {
        return this.getAllConfigs();
    }
    /**
   * Check if a sport is supported
   */ isSupported(sport) {
        return this.sportConfigs.has(sport);
    }
    /**
   * Check if a sport is enabled (fully implemented)
   */ isEnabled(sport) {
        const config = this.getConfig(sport);
        return config?.enabled || false;
    }
    /**
   * Get rule presets for a sport
   */ getRulePresets(sport) {
        const config = this.getConfig(sport);
        return config?.rulePresets || [];
    }
    /**
   * Get a specific rule preset
   */ getRulePreset(sport, presetName) {
        const presets = this.getRulePresets(sport);
        return presets.find((p)=>p.name === presetName) || null;
    }
    /**
   * Get match type configurations for a sport (Step 2 of wizard)
   */ getMatchTypes(sport) {
        const config = this.getConfig(sport);
        return config?.matchTypeConfigs || [];
    }
}
const sportConfigService = new SportConfigService();
}),
"[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMatchSetupStore",
    ()=>useMatchSetupStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/sportConfigService.ts [app-ssr] (ecmascript)");
;
;
;
const initialSession = {
    userId: 'current-user',
    step: 0,
    sport: undefined,
    matchTypeId: undefined,
    subtypeId: undefined,
    matchType: undefined,
    mode: undefined,
    teamSize: undefined,
    statIntensity: undefined,
    bestOf: undefined,
    locationId: undefined,
    date: new Date().toISOString(),
    teams: [
        {
            id: 'team_a',
            name: 'Team A',
            players: []
        },
        {
            id: 'team_b',
            name: 'Team B',
            players: []
        }
    ],
    rules: undefined,
    officials: undefined,
    schedule: null,
    privacy: 'public',
    isDraft: false,
    errors: {},
    lastUpdated: new Date()
};
const useMatchSetupStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        session: {
            ...initialSession
        },
        // Query methods
        getMatchTypes: (sport)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sportConfigService"].getMatchTypes(sport);
        },
        getSubtypesForType: (sport, matchTypeId)=>{
            const matchTypes = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sportConfigService"].getMatchTypes(sport);
            const matchType = matchTypes.find((mt)=>mt.id === matchTypeId);
            return matchType?.subtypes || [];
        },
        canProceedStep2: ()=>{
            const { session } = get();
            const { sport, matchTypeId, subtypeId } = session;
            if (!sport || !matchTypeId) return false;
            // Get match type config
            const matchTypes = get().getMatchTypes(sport);
            const matchType = matchTypes.find((mt)=>mt.id === matchTypeId);
            if (!matchType) return false;
            // If type has subtypes, subtype must be selected
            if (matchType.subtypes && matchType.subtypes.length > 0 && !subtypeId) {
                return false;
            }
            // Get subtype config if applicable
            let requiresTeamSize = matchType.requiresTeamSize;
            let requiresStatIntensity = matchType.requiresStatIntensity;
            let requiresBestOf = false;
            if (subtypeId && matchType.subtypes) {
                const subtype = matchType.subtypes.find((st)=>st.id === subtypeId);
                if (subtype) {
                    requiresTeamSize = subtype.requiresTeamSize;
                    requiresStatIntensity = subtype.requiresStatIntensity;
                    requiresBestOf = subtype.requiresBestOf || false;
                }
            }
            // Check all required fields are selected
            if (requiresTeamSize && !session.teamSize) return false;
            if (requiresStatIntensity && !session.statIntensity) return false;
            if (requiresBestOf && !session.bestOf) return false;
            return true;
        },
        canProceedStep4: ()=>{
            const { session } = get();
            const { teams, mode, teamSize } = session;
            if (!teams || teams.length === 0) return false;
            if (!teamSize) return false;
            // Competitive mode validation
            if (mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive) {
                for (const team of teams){
                    // Must have minimum players
                    if (team.players.length < teamSize.playersPerTeam) return false;
                    // Count non-substitutes and captains
                    const nonSubstitutes = team.players.filter((p)=>!p.isSubstitute);
                    const captains = team.players.filter((p)=>p.isCaptain);
                    // Must have exactly one captain
                    if (captains.length !== 1) return false;
                    // All non-substitutes must have jersey number AND position
                    for (const player of nonSubstitutes){
                        if (!player.jerseyNo || !player.position) return false;
                    }
                }
                return true;
            }
            // Casual mode: at least 1 player per team
            return teams.every((team)=>team.players.length >= 1);
        },
        getAllTeamPlayerIds: ()=>{
            const { session } = get();
            return session.teams.flatMap((team)=>team.players.map((p)=>p.id));
        },
        initializeSession: (userId = 'current-user', isLive = false)=>{
            set({
                session: {
                    ...initialSession,
                    userId,
                    date: new Date().toISOString(),
                    schedule: isLive ? null : new Date(),
                    teams: [
                        {
                            id: 'team_a',
                            name: 'Team A',
                            players: []
                        },
                        {
                            id: 'team_b',
                            name: 'Team B',
                            players: []
                        }
                    ],
                    lastUpdated: new Date()
                }
            });
        },
        resetSession: ()=>{
            set({
                session: {
                    ...initialSession
                }
            });
        },
        setStep: (step)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        step
                    }
                }));
        },
        setSport: (sport)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        sport,
                        matchTypeId: undefined,
                        subtypeId: undefined,
                        teamSize: undefined,
                        statIntensity: undefined,
                        bestOf: undefined
                    }
                }));
        },
        setMatchType: (type, mode)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        matchType: type,
                        mode
                    }
                }));
        },
        setMode: (mode)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        mode
                    }
                }));
        },
        setMatchTypeId: (matchTypeId)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        matchTypeId,
                        subtypeId: undefined,
                        teamSize: undefined,
                        statIntensity: undefined,
                        bestOf: undefined
                    }
                }));
        },
        setSubtypeId: (subtypeId)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        subtypeId,
                        teamSize: undefined,
                        statIntensity: undefined,
                        bestOf: undefined
                    }
                }));
        },
        setBestOf: (bestOf)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        bestOf
                    }
                }));
        },
        setTeamSize: (teamSize)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teamSize
                    }
                }));
        },
        setStatIntensity: (intensity)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        statIntensity: intensity
                    }
                }));
        },
        setLocation: (locationId)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        locationId
                    }
                }));
        },
        setDate: (date)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        date
                    }
                }));
        },
        setTeams: (teams)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams
                    }
                }));
        },
        addTeam: (team)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: [
                            ...state.session.teams,
                            team
                        ]
                    }
                }));
        },
        removeTeam: (teamId)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: state.session.teams.filter((t)=>t.id !== teamId)
                    }
                }));
        },
        addTeamPlayer: (teamId, player)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: state.session.teams.map((team)=>team.id === teamId ? {
                                ...team,
                                players: [
                                    ...team.players,
                                    player
                                ]
                            } : team)
                    }
                }));
        },
        removeTeamPlayer: (teamId, playerId)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: state.session.teams.map((team)=>team.id === teamId ? {
                                ...team,
                                players: team.players.filter((p)=>p.id !== playerId)
                            } : team)
                    }
                }));
        },
        updateTeamPlayer: (teamId, playerId, updates)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: state.session.teams.map((team)=>team.id === teamId ? {
                                ...team,
                                players: team.players.map((p)=>{
                                    // If setting this player as captain, unset other captains in same team
                                    if (updates.isCaptain === true && p.id !== playerId) {
                                        return {
                                            ...p,
                                            isCaptain: false
                                        };
                                    }
                                    // Update the target player
                                    if (p.id === playerId) {
                                        return {
                                            ...p,
                                            ...updates
                                        };
                                    }
                                    return p;
                                })
                            } : team)
                    }
                }));
        },
        updateTeamName: (teamId, name)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        teams: state.session.teams.map((team)=>team.id === teamId ? {
                                ...team,
                                name
                            } : team)
                    }
                }));
        },
        setRules: (rules)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        rules
                    }
                }));
        },
        updateRuleField: (path, value)=>{
            set((state)=>{
                if (!state.session.rules) return state;
                const keys = path.split('.');
                const newRules = JSON.parse(JSON.stringify(state.session.rules));
                // Navigate to the nested property
                let current = newRules;
                for(let i = 0; i < keys.length - 1; i++){
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
                return {
                    session: {
                        ...state.session,
                        rules: newRules
                    }
                };
            });
        },
        updateRulesFromPreset: (presetRules)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        rules: presetRules
                    }
                }));
        },
        setOfficials: (officials)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        officials
                    }
                }));
        },
        addReferee: (userId)=>{
            set((state)=>{
                if (!state.session.officials) {
                    return state; // Officials must be initialized first
                }
                // Avoid duplicates and limit to 3 referees
                if (state.session.officials.referees.includes(userId) || state.session.officials.referees.length >= 3) {
                    return state;
                }
                return {
                    session: {
                        ...state.session,
                        officials: {
                            ...state.session.officials,
                            referees: [
                                ...state.session.officials.referees,
                                userId
                            ]
                        }
                    }
                };
            });
        },
        removeReferee: (userId)=>{
            set((state)=>{
                if (!state.session.officials) return state;
                return {
                    session: {
                        ...state.session,
                        officials: {
                            ...state.session.officials,
                            referees: state.session.officials.referees.filter((id)=>id !== userId)
                        }
                    }
                };
            });
        },
        setPrimaryRecorder: (userId)=>{
            set((state)=>{
                if (!state.session.officials) return state;
                return {
                    session: {
                        ...state.session,
                        officials: {
                            ...state.session.officials,
                            primaryRecorder: userId
                        }
                    }
                };
            });
        },
        addSecondaryRecorder: (userId)=>{
            set((state)=>{
                if (!state.session.officials) return state;
                const secondaryRecorders = state.session.officials.secondaryRecorders || [];
                if (secondaryRecorders.includes(userId)) {
                    return state; // Avoid duplicates
                }
                return {
                    session: {
                        ...state.session,
                        officials: {
                            ...state.session.officials,
                            secondaryRecorders: [
                                ...secondaryRecorders,
                                userId
                            ]
                        }
                    }
                };
            });
        },
        removeSecondaryRecorder: (userId)=>{
            set((state)=>{
                if (!state.session.officials) return state;
                const secondaryRecorders = state.session.officials.secondaryRecorders || [];
                return {
                    session: {
                        ...state.session,
                        officials: {
                            ...state.session.officials,
                            secondaryRecorders: secondaryRecorders.filter((id)=>id !== userId)
                        }
                    }
                };
            });
        },
        setSchedule: (schedule)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        schedule
                    }
                }));
        },
        setPrivacy: (privacy)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        privacy
                    }
                }));
        },
        setIsLive: (isLive)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        schedule: isLive ? null : state.session.schedule
                    }
                }));
        },
        setError: (step, error)=>{
            set((state)=>({
                    session: {
                        ...state.session,
                        errors: {
                            ...state.session.errors,
                            [`step_${step}`]: error
                        }
                    }
                }));
        },
        clearError: (step)=>{
            set((state)=>{
                const errors = {
                    ...state.session.errors
                };
                delete errors[`step_${step}`];
                return {
                    session: {
                        ...state.session,
                        errors
                    }
                };
            });
        },
        getSession: ()=>get().session
    }));
}),
"[project]/Athlee/apps/web/src/lib/mockLocations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_USER_LOCATION",
    ()=>MOCK_USER_LOCATION,
    "generateMockBookings",
    ()=>generateMockBookings,
    "generateMockEvents",
    ()=>generateMockEvents,
    "generateMockLocations",
    ()=>generateMockLocations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
;
const MOCK_USER_LOCATION = {
    lat: 40.7128,
    lng: -74.006
};
function generateMockLocations() {
    const locations = [
        // Business Locations - Basketball
        {
            id: 'loc_basketball_downtown',
            name: 'Downtown Basketball Arena',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '123 Sports Ave, New York, NY 10001',
            coordinates: {
                lat: 40.7128,
                lng: -74.006
            },
            description: 'Professional-grade basketball courts with full amenities',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].ChangingRooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks
            ],
            hours: '06:00-23:00',
            images: [
                'https://via.placeholder.com/400x300?text=Basketball+Court'
            ],
            capacity: 100,
            verified: true,
            ownerId: 'business_001',
            createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_1',
                'player_2',
                'player_3',
                'player_4'
            ],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_basketball_eastside',
            name: 'Eastside Hoops',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '456 Court Street, New York, NY 10002',
            coordinates: {
                lat: 40.715,
                lng: -73.98
            },
            description: 'Indoor basketball facility with 3 courts',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].WiFi
            ],
            hours: '07:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Hoops'
            ],
            capacity: 60,
            verified: true,
            ownerId: 'business_002',
            createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_5',
                'player_6',
                'player_7'
            ],
            upcomingEvents: [],
            bookings: []
        },
        // Community Basketball Courts
        {
            id: 'loc_basketball_harlem',
            name: 'Harlem Community Basketball',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: '200 Harlem Ave, New York, NY 10025',
            coordinates: {
                lat: 40.8166,
                lng: -73.9397
            },
            description: 'Historic community basketball court, free to play',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting
            ],
            hours: '06:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Community+Basketball'
            ],
            capacity: 40,
            verified: true,
            createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_10',
                'player_11',
                'player_12',
                'player_13',
                'player_14'
            ],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_basketball_brooklyn',
            name: 'Brooklyn Basketball Court',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: '500 Brooklyn Way, Brooklyn, NY 11201',
            coordinates: {
                lat: 40.6892,
                lng: -73.9760
            },
            description: 'Public basketball court in Brooklyn',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking
            ],
            hours: '08:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Brooklyn+Basketball'
            ],
            capacity: 35,
            verified: true,
            createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_15',
                'player_16',
                'player_17'
            ],
            upcomingEvents: [],
            bookings: []
        },
        // Business Locations - Soccer
        {
            id: 'loc_soccer_central',
            name: 'Central Soccer Complex',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '789 Field Road, New York, NY 10003',
            coordinates: {
                lat: 40.72,
                lng: -73.97
            },
            description: 'Full-size outdoor soccer fields',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks
            ],
            hours: '08:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Soccer+Field'
            ],
            capacity: 150,
            verified: true,
            ownerId: 'business_001',
            createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_20',
                'player_21'
            ],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_soccer_westfield',
            name: 'Westfield Soccer Park',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '321 Park Avenue, New York, NY 10004',
            coordinates: {
                lat: 40.71,
                lng: -74.01
            },
            description: 'Community soccer park with 2 fields',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating
            ],
            hours: '09:00-20:00',
            images: [
                'https://via.placeholder.com/400x300?text=Soccer+Park'
            ],
            capacity: 80,
            verified: true,
            ownerId: 'business_003',
            createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_25',
                'player_26'
            ],
            upcomingEvents: [],
            bookings: []
        },
        // Business Locations - Tennis
        {
            id: 'loc_tennis_uptown',
            name: 'Uptown Tennis Club',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '654 Tennis Lane, New York, NY 10005',
            coordinates: {
                lat: 40.73,
                lng: -73.96
            },
            description: 'Premier tennis courts with coaching available',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].ChangingRooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].WiFi,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks
            ],
            hours: '07:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Tennis+Court'
            ],
            capacity: 40,
            verified: true,
            ownerId: 'business_002',
            createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_27'
            ],
            upcomingEvents: [],
            bookings: []
        },
        // Business Locations - Multiple Sports
        {
            id: 'loc_multiplex_downtown',
            name: 'Downtown Sports Multiplex',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Badminton
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '999 Multi Street, New York, NY 10006',
            coordinates: {
                lat: 40.714,
                lng: -73.99
            },
            description: 'Full-service sports multiplex with multiple court types',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].ChangingRooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].WiFi,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Scoreboard
            ],
            hours: '06:00-23:00',
            images: [
                'https://via.placeholder.com/400x300?text=Sports+Multiplex'
            ],
            capacity: 200,
            verified: true,
            ownerId: 'business_001',
            createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_28',
                'player_29',
                'player_30',
                'player_31',
                'player_32',
                'player_33'
            ],
            upcomingEvents: [],
            bookings: []
        },
        // Community Locations
        {
            id: 'loc_community_basketball_1',
            name: 'Central Park Basketball Court',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: 'Central Park, New York, NY 10024',
            coordinates: {
                lat: 40.785,
                lng: -73.968
            },
            description: 'Outdoor public basketball court, free to use',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting
            ],
            hours: '06:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Community+Court'
            ],
            capacity: 50,
            verified: true,
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [
                'player_34',
                'player_35',
                'player_36'
            ],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_community_soccer_1',
            name: 'Washington Square Soccer',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: 'Washington Square Park, New York, NY 10012',
            coordinates: {
                lat: 40.7323,
                lng: -73.9971
            },
            description: 'Community soccer pitch in Washington Square Park',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating
            ],
            hours: '08:00-20:00',
            images: [
                'https://via.placeholder.com/400x300?text=Community+Soccer'
            ],
            capacity: 60,
            verified: true,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_community_tennis_1',
            name: 'East River Tennis Courts',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: 'East River Park, New York, NY 10009',
            coordinates: {
                lat: 40.7227,
                lng: -73.9729
            },
            description: 'Public tennis courts maintained by the community',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking
            ],
            hours: '07:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Community+Tennis'
            ],
            capacity: 32,
            verified: true,
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_community_badminton_1',
            name: 'Community Badminton Hall',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Badminton
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: '888 Community Lane, New York, NY 10010',
            coordinates: {
                lat: 40.725,
                lng: -73.975
            },
            description: 'Community-managed indoor badminton facility',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting
            ],
            hours: '10:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Badminton+Hall'
            ],
            capacity: 45,
            verified: true,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        // Private Locations
        {
            id: 'loc_private_basketball_1',
            name: 'Private Basketball Court - Downtown',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Private,
            address: '111 Private Drive, New York, NY 10007',
            coordinates: {
                lat: 40.71,
                lng: -73.985
            },
            description: 'Private basketball court by invitation only',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].ChangingRooms
            ],
            hours: '08:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Private+Court'
            ],
            capacity: 20,
            verified: true,
            ownerId: 'player_001',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_private_soccer_1',
            name: 'Private Soccer Field - Exclusive',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Private,
            address: '222 Exclusive Lane, New York, NY 10008',
            coordinates: {
                lat: 40.72,
                lng: -74.0
            },
            description: 'Exclusive private soccer field for members only',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting
            ],
            hours: '09:00-20:00',
            images: [
                'https://via.placeholder.com/400x300?text=Private+Field'
            ],
            capacity: 30,
            verified: true,
            ownerId: 'business_004',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        // Additional locations for diversity
        {
            id: 'loc_volleyball_beach',
            name: 'Volleyball Beach Complex',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '777 Beach Road, New York, NY 10009',
            coordinates: {
                lat: 40.76,
                lng: -73.9
            },
            description: 'Indoor volleyball courts with beach courts',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].WiFi
            ],
            hours: '08:00-22:00',
            images: [
                'https://via.placeholder.com/400x300?text=Volleyball'
            ],
            capacity: 80,
            verified: true,
            ownerId: 'business_005',
            createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_pickleball_courts',
            name: 'Pickleball Paradise',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Pickleball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '555 Pickleball Way, New York, NY 10011',
            coordinates: {
                lat: 40.735,
                lng: -73.955
            },
            description: 'Dedicated pickleball courts for all levels',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks
            ],
            hours: '09:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Pickleball'
            ],
            capacity: 60,
            verified: true,
            ownerId: 'business_003',
            createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_baseball_diamond',
            name: 'Baseball Diamond Park',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Baseball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: '444 Diamond Street, New York, NY 10012',
            coordinates: {
                lat: 40.76,
                lng: -73.96
            },
            description: 'Community baseball field with lighting',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating
            ],
            hours: '08:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Baseball'
            ],
            capacity: 100,
            verified: true,
            createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_football_field',
            name: 'American Football Gridiron',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].American_Football
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '333 Gridiron Ave, New York, NY 10013',
            coordinates: {
                lat: 40.745,
                lng: -73.98
            },
            description: 'Full-size American football field',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating
            ],
            hours: '07:00-20:00',
            images: [
                'https://via.placeholder.com/400x300?text=Football'
            ],
            capacity: 150,
            verified: true,
            ownerId: 'business_002',
            createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        // Mixed sports locations
        {
            id: 'loc_multi_sports_1',
            name: 'All-Sports Recreation Center',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Badminton
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business,
            address: '222 Recreation Way, New York, NY 10014',
            coordinates: {
                lat: 40.755,
                lng: -73.945
            },
            description: 'Complete sports facility with courts for all major sports',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].ChangingRooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Snacks,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].WiFi,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Scoreboard
            ],
            hours: '06:00-23:00',
            images: [
                'https://via.placeholder.com/400x300?text=Recreation+Center'
            ],
            capacity: 300,
            verified: true,
            ownerId: 'business_004',
            createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        },
        {
            id: 'loc_community_multi_1',
            name: 'Community Sports Park',
            sports: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Baseball
            ],
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: '111 Park Lane, New York, NY 10015',
            coordinates: {
                lat: 40.715,
                lng: -73.993
            },
            description: 'Large community park with multiple sports facilities',
            amenities: [
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Restrooms,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Seating,
                __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Lighting
            ],
            hours: '07:00-21:00',
            images: [
                'https://via.placeholder.com/400x300?text=Community+Park'
            ],
            capacity: 120,
            verified: true,
            createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: []
        }
    ];
    return locations;
}
function generateMockEvents(locations) {
    const events = [];
    locations.forEach((location)=>{
        // Generate 3-5 events per location
        const eventCount = Math.floor(Math.random() * 3) + 3;
        for(let i = 0; i < eventCount; i++){
            const daysOffset = Math.floor(Math.random() * 20) + 1; // Next 20 days
            const eventDate = new Date();
            eventDate.setDate(eventDate.getDate() + daysOffset);
            const sport = location.sports[Math.floor(Math.random() * location.sports.length)];
            const eventTypes = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventType"]);
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            events.push({
                id: `event_${location.id}_${i}`,
                locationId: location.id,
                title: `${eventType} - ${sport}`,
                type: eventType,
                date: eventDate.toISOString(),
                time: `${String(Math.floor(Math.random() * 15) + 8).padStart(2, '0')}:00`,
                maxParticipants: Math.floor(Math.random() * 12) + 4,
                registeredUsers: [],
                description: `Join us for an exciting ${eventType.toLowerCase()} event in ${sport}!`,
                createdAt: new Date().toISOString()
            });
        }
    });
    return events;
}
function generateMockBookings(locations) {
    const bookings = [];
    locations.forEach((location)=>{
        if (location.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business) return; // Only business locations have bookings
        // Generate 10-15 bookings for next 7 days
        const bookingCount = Math.floor(Math.random() * 6) + 10;
        for(let i = 0; i < bookingCount; i++){
            const daysOffset = Math.floor(Math.random() * 7);
            const bookingDate = new Date();
            bookingDate.setDate(bookingDate.getDate() + daysOffset);
            const startHour = Math.floor(Math.random() * 14) + 8; // 8:00 to 22:00
            const startTime = `${String(startHour).padStart(2, '0')}:00`;
            const endHour = startHour + Math.floor(Math.random() * 3) + 1;
            const endTime = `${String(Math.min(endHour, 22)).padStart(2, '0')}:00`;
            bookings.push({
                id: `booking_${location.id}_${i}`,
                locationId: location.id,
                userId: `player_${Math.floor(Math.random() * 10) + 1}`,
                date: bookingDate.toISOString().split('T')[0],
                startTime,
                endTime,
                status: Math.random() > 0.1 ? 'confirmed' : 'cancelled',
                createdAt: new Date().toISOString()
            });
        }
    });
    return bookings;
}
}),
"[project]/Athlee/apps/web/src/lib/chatService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatService",
    ()=>chatService
]);
/**
 * ChatService handles community chat rooms for locations
 * Data is persisted in localStorage under the "athlee_chatrooms" key
 */ class ChatService {
    STORAGE_KEY = 'athlee_chatrooms';
    /**
   * Get all chat rooms from storage
   */ getAllChatRooms() {
        if ("TURBOPACK compile-time truthy", 1) return [];
        //TURBOPACK unreachable
        ;
    }
    /**
   * Save chat rooms to storage
   */ saveChatRooms(rooms) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Get or create a chat room for a location
   */ getOrCreateChatRoom(locationId, locationName) {
        const rooms = this.getAllChatRooms();
        let room = rooms.find((r)=>r.locationId === locationId);
        if (!room) {
            room = {
                id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                locationId,
                name: `${locationName} Chat`,
                members: [],
                moderators: [],
                messages: [],
                createdAt: new Date().toISOString()
            };
            rooms.push(room);
            this.saveChatRooms(rooms);
        }
        return room;
    }
    /**
   * Get a chat room by ID
   */ getChatRoomById(chatId) {
        return this.getAllChatRooms().find((r)=>r.id === chatId) || null;
    }
    /**
   * Get a chat room by location ID
   */ getChatRoomByLocationId(locationId) {
        return this.getAllChatRooms().find((r)=>r.locationId === locationId) || null;
    }
    /**
   * Add a member to a chat room
   */ addMember(chatId, userId) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        if (!room.members.includes(userId)) {
            room.members.push(userId);
            this.saveChatRooms(rooms);
        }
        return room;
    }
    /**
   * Remove a member from a chat room
   */ removeMember(chatId, userId) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        room.members = room.members.filter((u)=>u !== userId);
        room.moderators = room.moderators.filter((u)=>u !== userId);
        this.saveChatRooms(rooms);
        return room;
    }
    /**
   * Send a message to a chat room
   */ sendMessage(chatId, userId, text) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        const message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId,
            text: text.trim(),
            timestamp: new Date().toISOString()
        };
        room.messages.push(message);
        this.saveChatRooms(rooms);
        return message;
    }
    /**
   * Get all messages in a chat room (limited to last 100 for performance)
   */ getMessages(chatId, limit = 100) {
        const room = this.getChatRoomById(chatId);
        if (!room) return [];
        return room.messages.slice(-limit);
    }
    /**
   * Nominate a user for moderator (moderator election)
   */ nominateModerator(chatId, candidateId) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        if (!room.candidates) {
            room.candidates = [];
        }
        if (!room.candidates.includes(candidateId)) {
            room.candidates.push(candidateId);
        }
        if (!room.votes) {
            room.votes = {};
        }
        this.saveChatRooms(rooms);
        return room;
    }
    /**
   * Vote for a moderator candidate
   */ voteModerator(chatId, voterId, candidateId) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        if (!room.votes) {
            room.votes = {};
        }
        room.votes[voterId] = candidateId;
        // Check if election threshold reached (e.g., 10 members)
        if (room.members.length >= 10) {
            const VOTES_NEEDED = Math.ceil(room.members.length / 2);
            const voteCount = {};
            Object.values(room.votes).forEach((candidateId)=>{
                voteCount[candidateId] = (voteCount[candidateId] || 0) + 1;
            });
            // Get top 2 candidates
            const sorted = Object.entries(voteCount).sort((a, b)=>b[1] - a[1]).slice(0, 2);
            if (sorted.length > 0 && sorted[0][1] >= VOTES_NEEDED) {
                room.moderators = sorted.map((entry)=>entry[0]);
                room.electionActive = false;
                room.candidates = [];
                room.votes = {};
            }
        }
        this.saveChatRooms(rooms);
        return room;
    }
    /**
   * Start a moderator election
   */ startModeratorElection(chatId) {
        const rooms = this.getAllChatRooms();
        const room = rooms.find((r)=>r.id === chatId);
        if (!room) return null;
        room.electionActive = true;
        room.candidates = [];
        room.votes = {};
        this.saveChatRooms(rooms);
        return room;
    }
    /**
   * Delete a chat room
   */ deleteChatRoom(chatId) {
        const rooms = this.getAllChatRooms();
        const filtered = rooms.filter((r)=>r.id !== chatId);
        if (filtered.length === rooms.length) return false;
        this.saveChatRooms(filtered);
        return true;
    }
}
const chatService = new ChatService();
}),
"[project]/Athlee/apps/web/src/lib/locationService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "locationService",
    ()=>locationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockLocations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockLocations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$chatService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/chatService.ts [app-ssr] (ecmascript)");
;
;
;
/**
 * Mock user location for distance calculations
 */ const MOCK_USER_LOCATION = {
    lat: 40.7128,
    lng: -74.0060
}; // NYC
/**
 * LocationService handles all location-related operations
 * Data is persisted in localStorage under the "athlee_locations" key
 */ class LocationService {
    STORAGE_KEY = 'athlee_locations';
    CHECKIN_KEY = 'athlee_checkins';
    initialized = false;
    /**
   * Initialize mock data if storage is empty
   */ initializeMockData() {
        if (this.initialized || ("TURBOPACK compile-time value", "undefined") === 'undefined') return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Calculate distance in miles between two coordinates (simple approximation)
   */ calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 3959; // Earth's radius in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10; // Round to 1 decimal
    }
    /**
   * Get distance from user location to a specific location (public method)
   */ getDistance(locationId) {
        const location = this.getLocationById(locationId);
        if (!location) return 0;
        return this.calculateDistance(MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng, location.coordinates.lat, location.coordinates.lng);
    }
    /**
   * Get all locations from storage
   */ getAllLocations() {
        if ("TURBOPACK compile-time truthy", 1) return [];
        //TURBOPACK unreachable
        ;
    }
    /**
   * Save locations to storage
   */ saveLocations(locations) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Get all check-ins from storage
   */ getAllCheckIns() {
        if ("TURBOPACK compile-time truthy", 1) return [];
        //TURBOPACK unreachable
        ;
    }
    /**
   * Save check-ins to storage
   */ saveCheckIns(checkIns) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Clean up expired check-ins
   */ cleanupExpiredCheckIns() {
        const checkIns = this.getAllCheckIns();
        const now = new Date();
        const active = checkIns.filter((ci)=>new Date(ci.expiresAt) > now);
        this.saveCheckIns(active);
    }
    /**
   * Get filtered and sorted locations
   */ getLocations(filters, sort) {
        this.cleanupExpiredCheckIns();
        let locations = this.getAllLocations();
        // Apply filters
        if (filters) {
            // Filter by sports (OR logic: match if location has ANY of the selected sports)
            if (filters.sports && filters.sports.length > 0) {
                locations = locations.filter((loc)=>{
                    const locSports = loc.sports || [];
                    return locSports.some((sport)=>filters.sports.includes(sport));
                });
            }
            // Filter by type (OR logic: match if location type is in selected types)
            if (filters.type && filters.type.length > 0) {
                locations = locations.filter((loc)=>filters.type.includes(loc.type));
            }
            // Filter by search text (searches name, address, description)
            if (filters.search && filters.search.trim()) {
                const search = filters.search.toLowerCase();
                locations = locations.filter((loc)=>loc.name.toLowerCase().includes(search) || loc.address.toLowerCase().includes(search) || (loc.description || '').toLowerCase().includes(search));
            }
            // Filter by distance from user
            if (filters.distance !== undefined && filters.distance > 0) {
                const maxDistance = filters.distance;
                locations = locations.filter((loc)=>this.calculateDistance(MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng, loc.coordinates.lat, loc.coordinates.lng) <= maxDistance);
            }
        }
        // Apply sorting
        if (sort === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortOption"].Nearest) {
            locations.sort((a, b)=>this.calculateDistance(MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng, a.coordinates.lat, a.coordinates.lng) - this.calculateDistance(MOCK_USER_LOCATION.lat, MOCK_USER_LOCATION.lng, b.coordinates.lat, b.coordinates.lng));
        } else if (sort === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortOption"].MostActive) {
            locations.sort((a, b)=>(b.activePlayers?.length || 0) - (a.activePlayers?.length || 0));
        } else if (sort === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortOption"].Newest) {
            locations.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sort === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortOption"].MostBookings) {
            locations.sort((a, b)=>(b.bookings?.length || 0) - (a.bookings?.length || 0));
        }
        return locations;
    }
    /**
   * Get a single location by ID with all related data
   */ getLocationById(locationId) {
        this.cleanupExpiredCheckIns();
        const location = this.getAllLocations().find((loc)=>loc.id === locationId);
        if (!location) return null;
        // Enrich with active players
        const checkIns = this.getAllCheckIns();
        location.activePlayers = checkIns.filter((ci)=>ci.locationId === locationId).map((ci)=>ci.userId);
        return location;
    }
    /**
   * Create a new location
   */ createLocation(locationData) {
        const locations = this.getAllLocations();
        const newLocation = {
            id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: locationData.name || 'New Location',
            sports: locationData.sports || [],
            type: locationData.type || __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community,
            address: locationData.address || '',
            coordinates: locationData.coordinates || {
                lat: 0,
                lng: 0
            },
            description: locationData.description || '',
            amenities: locationData.amenities || [],
            hours: locationData.hours || '08:00-22:00',
            images: locationData.images || [
                'https://via.placeholder.com/400x300?text=Location'
            ],
            capacity: locationData.capacity,
            verified: locationData.verified || (locationData.type === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business ? true : false),
            ownerId: locationData.ownerId,
            createdAt: new Date().toISOString(),
            activePlayers: [],
            upcomingEvents: [],
            bookings: [],
            chatRoomId: locationData.chatRoomId
        };
        locations.push(newLocation);
        this.saveLocations(locations);
        return newLocation;
    }
    /**
   * Update an existing location
   */ updateLocation(locationId, updates) {
        const locations = this.getAllLocations();
        const index = locations.findIndex((loc)=>loc.id === locationId);
        if (index === -1) return null;
        locations[index] = {
            ...locations[index],
            ...updates,
            id: locationId
        };
        this.saveLocations(locations);
        return locations[index];
    }
    /**
   * Delete a location
   */ deleteLocation(locationId) {
        const locations = this.getAllLocations();
        const filtered = locations.filter((loc)=>loc.id !== locationId);
        if (filtered.length === locations.length) return false;
        this.saveLocations(filtered);
        return true;
    }
    /**
   * Check in a user to a location
   */ checkIn(userId, locationId, status) {
        const checkIns = this.getAllCheckIns();
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours
        // Remove existing check-in for this user at this location
        const filtered = checkIns.filter((ci)=>!(ci.userId === userId && ci.locationId === locationId));
        const checkIn = {
            userId,
            locationId,
            status,
            checkedInAt: now.toISOString(),
            expiresAt: expiresAt.toISOString()
        };
        filtered.push(checkIn);
        this.saveCheckIns(filtered);
        return checkIn;
    }
    /**
   * Check out a user from a location
   */ checkOut(userId, locationId) {
        const checkIns = this.getAllCheckIns();
        const filtered = checkIns.filter((ci)=>!(ci.userId === userId && ci.locationId === locationId));
        if (filtered.length === checkIns.length) return false;
        this.saveCheckIns(filtered);
        return true;
    }
    /**
   * Get active player details for a location
   */ getActivePlayers(locationId) {
        this.cleanupExpiredCheckIns();
        const checkIns = this.getAllCheckIns();
        return checkIns.filter((ci)=>ci.locationId === locationId).map((ci)=>({
                userId: ci.userId,
                status: ci.status
            }));
    }
    /**
   * Get check-in status for a user at a location
   */ getCheckInStatus(userId, locationId) {
        this.cleanupExpiredCheckIns();
        const checkIns = this.getAllCheckIns();
        return checkIns.find((ci)=>ci.userId === userId && ci.locationId === locationId) || null;
    }
    /**
   * Get all locations owned by a user (for business dashboard)
   */ getLocationsByOwner(ownerId) {
        return this.getAllLocations().filter((loc)=>loc.ownerId === ownerId);
    }
    /**
   * Get statistics for a location
   */ getLocationStats(locationId) {
        const location = this.getLocationById(locationId);
        if (!location) {
            return {
                totalBookings: 0,
                bookingsToday: 0,
                activeNow: 0
            };
        }
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        return {
            totalBookings: location.bookings?.length || 0,
            bookingsToday: location.bookings?.filter((b)=>b.date === today && b.status !== 'cancelled').length || 0,
            activeNow: location.activePlayers?.length || 0
        };
    }
}
const locationService = new LocationService();
}),
"[project]/Athlee/apps/web/src/components/match/SportCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SportCard Component
 * 
 * Individual sport card for the sport picker.
 * Shows sport icon, name, and selection state.
 * Handles disabled state with "Coming Soon" overlay.
 */ __turbopack_context__.s([
    "SportCard",
    ()=>SportCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const SportCard = ({ sport, isSelected, onSelect })=>{
    const handleClick = ()=>{
        if (sport.enabled) {
            onSelect(sport);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        disabled: !sport.enabled,
        className: `
        relative
        w-full
        aspect-square
        rounded-lg
        flex
        flex-col
        items-center
        justify-center
        gap-3
        p-4
        transition-all
        duration-200
        ${sport.enabled ? isSelected ? 'bg-blue-100 border-2 border-blue-600 shadow-md' : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-md' : 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-60'}
      `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-5xl",
                children: sport.icon
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-gray-800 text-center truncate w-full",
                children: sport.displayName
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            sport.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-600 text-center line-clamp-2",
                children: sport.description
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !sport.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-lg bg-black bg-opacity-30 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-bold text-white bg-black bg-opacity-60 px-2 py-1 rounded",
                    children: "COMING SOON"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/SportCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/SportPicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SportPicker",
    ()=>SportPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SportCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/SportCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/sportConfigService.ts [app-ssr] (ecmascript)");
/**
 * SportPicker Component
 * 
 * Display all available sports in a responsive grid.
 * Simple reusable component - navigation handled by parent.
 */ 'use client';
;
;
;
;
const SportPicker = ({ selected, onSelect })=>{
    const [sports, setSports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load available sports on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const availableSports = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sportConfigService"].getSportsForPicker();
        setSports(availableSports);
    }, []);
    const handleSelectSport = (sport)=>{
        onSelect(sport.sport);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: sports.map((sport, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SportCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportCard"], {
                        sport: sport,
                        isSelected: selected === sport.sport,
                        onSelect: handleSelectSport
                    }, `sport-${sport.sport}-${index}`, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SportPicker.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportPicker.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            sports.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500",
                    children: "No sports available"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/SportPicker.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SportPicker.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/SportPicker.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchTypeCard",
    ()=>MatchTypeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const MatchTypeCard = ({ config, isSelected, onSelect, hasSubtypes = false })=>{
    const handleClick = ()=>{
        if (config.enabled) {
            onSelect(config.id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        disabled: !config.enabled,
        title: config.tooltip,
        className: `
        flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50' : config.enabled ? 'border-gray-300 bg-white hover:border-gray-400' : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'}
      `,
        children: [
            config.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl",
                children: config.icon
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                lineNumber: 44,
                columnNumber: 23
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-sm",
                        children: config.name
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600",
                        children: config.description
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    hasSubtypes && !isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 mt-1",
                        children: "→ Subtypes"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !config.enabled && config.tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1",
                children: config.tooltip
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubtypeCard",
    ()=>SubtypeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const SubtypeCard = ({ config, isSelected, onSelect })=>{
    const handleClick = ()=>{
        if (config.enabled) {
            onSelect(config.id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        disabled: !config.enabled,
        title: config.tooltip,
        className: `
        flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
        ${isSelected ? 'border-green-500 bg-green-50' : config.enabled ? 'border-gray-300 bg-white hover:border-gray-400' : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'}
      `,
        children: [
            config.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl",
                children: config.icon
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                lineNumber: 42,
                columnNumber: 23
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-medium text-sm",
                        children: config.name
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600",
                        children: config.description
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    config.fixedTeamSize && !isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-blue-600 mt-1 font-medium",
                        children: config.fixedTeamSize
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !config.enabled && config.tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1",
                children: config.tooltip
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModeToggle",
    ()=>ModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
'use client';
;
;
const ModeToggle = ({ selectedMode, onSelectMode, disabled = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-semibold",
                children: "Match Mode"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive
                ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectMode(mode),
                        disabled: disabled,
                        className: `
              flex-1 py-2 px-3 rounded-lg font-medium transition-all
              ${selectedMode === mode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `,
                        children: mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual ? '👕 Casual' : '🏆 Competitive'
                    }, mode, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-blue-600",
                children: "ℹ️ Casual matches are simplified and welcoming to all skill levels."
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-amber-600",
                children: "ℹ️ Competitive matches require jersey numbers and stricter validation."
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamSizePicker",
    ()=>TeamSizePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const TeamSizePicker = ({ options, selectedTeamSize, onSelectTeamSize, disabled = false, fixedSize })=>{
    if (fixedSize) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "text-sm font-semibold",
                    children: "Team Size"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-2 px-3 rounded-lg bg-blue-50 border-2 border-blue-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-center",
                            children: fixedSize
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-600 text-center",
                            children: "Fixed for this match type"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-semibold",
                children: "Team Size"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectTeamSize(option),
                        disabled: disabled,
                        className: `
              py-2 px-3 rounded-lg font-medium transition-all
              ${selectedTeamSize?.label === option.label ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `,
                        children: [
                            option.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs block text-gray-700 mt-1",
                                children: option.substitutes > 0 ? `+${option.substitutes} subs` : 'No subs'
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, option.label, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatIntensityPicker",
    ()=>StatIntensityPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
'use client';
;
;
const intensityDescriptions = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Basic]: 'Points only',
    [__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Advanced]: 'Points, Rebounds, Assists, Steals, Blocks',
    [__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Professional]: 'Advanced + Shooting Splits',
    [__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensity"].Custom]: 'Custom tracked stats'
};
const StatIntensityPicker = ({ options, selectedIntensity, onSelectIntensity, disabled = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-semibold",
                children: "Stat Tracking"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectIntensity(option),
                        disabled: disabled,
                        className: `
              flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left
              ${selectedIntensity === option ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-sm",
                                        children: option
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600",
                                        children: intensityDescriptions[option]
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            selectedIntensity === option && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-purple-500 text-lg",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, option, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BestOfPicker",
    ()=>BestOfPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const BestOfPicker = ({ selectedBestOf, onSelectBestOf, disabled = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-semibold",
                children: "Number of Games"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    3,
                    5
                ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectBestOf(num),
                        disabled: disabled,
                        className: `
              flex-1 py-2 px-3 rounded-lg font-medium transition-all
              ${selectedBestOf === num ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-lg font-bold",
                                children: num
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: [
                                    "Best of ",
                                    num
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, num, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-600",
                children: [
                    "First to ",
                    selectedBestOf ? Math.ceil(selectedBestOf / 2) : '?',
                    " wins"
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchTypeConfigurator",
    ()=>MatchTypeConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$MatchTypeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/MatchTypeCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SubtypeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/SubtypeCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$ModeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/ModeToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamSizePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/TeamSizePicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$StatIntensityPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/StatIntensityPicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$BestOfPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/BestOfPicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/sportConfigService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const MatchTypeConfigurator = ({ onNext = ()=>{}, onBack = ()=>{} })=>{
    const { session, setMatchTypeId, setSubtypeId, setMode, setTeamSize, setStatIntensity, setBestOf, getMatchTypes, getSubtypesForType, canProceedStep2 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const { sport, matchTypeId, subtypeId, mode, teamSize, statIntensity, bestOf } = session;
    // Get match types for selected sport
    const matchTypes = sport ? getMatchTypes(sport) : [];
    const selectedMatchType = matchTypes.find((mt)=>mt.id === matchTypeId);
    const subtypes = matchTypeId ? getSubtypesForType(sport, matchTypeId) : [];
    const selectedSubtype = subtypeId ? subtypes.find((st)=>st.id === subtypeId) : undefined;
    // Get team size options from sport config
    const sportConfig = sport ? __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$sportConfigService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sportConfigService"].getConfig(sport) : null;
    const teamSizeOptions = sportConfig?.teamSizeOptions || [];
    const statIntensityOptions = sportConfig?.statIntensities || [];
    // Determine what fields are required based on selected type/subtype
    let requiresTeamSize = selectedMatchType?.requiresTeamSize || false;
    let requiresStatIntensity = selectedMatchType?.requiresStatIntensity || false;
    let requiresBestOf = false;
    let fixedTeamSize;
    if (selectedSubtype) {
        requiresTeamSize = selectedSubtype.requiresTeamSize;
        requiresStatIntensity = selectedSubtype.requiresStatIntensity;
        requiresBestOf = selectedSubtype.requiresBestOf || false;
        fixedTeamSize = selectedSubtype.fixedTeamSize;
    }
    // Pre-select defaults on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (sport && matchTypes.length > 0) {
            // Pre-select first enabled match type if not already selected
            if (!matchTypeId) {
                const enabledType = matchTypes.find((t)=>t.enabled);
                if (enabledType) {
                    setMatchTypeId(enabledType.id);
                }
            }
            // Pre-select default mode if not set
            if (!mode) {
                setMode(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual);
            }
        }
    }, [
        sport,
        matchTypeId,
        mode,
        matchTypes,
        setMatchTypeId,
        setMode
    ]);
    // Pre-select default team size and stat intensity when required fields change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (requiresTeamSize && !teamSize && !fixedTeamSize && teamSizeOptions.length > 0) {
            // Select default team size (usually first one)
            const defaultSize = selectedMatchType?.defaultTeamSize || selectedSubtype?.fixedTeamSize || teamSizeOptions[0]?.label;
            if (defaultSize) {
                const teamSizeConfig = teamSizeOptions.find((ts)=>ts.label === defaultSize);
                if (teamSizeConfig) {
                    setTeamSize(teamSizeConfig);
                }
            }
        }
        if (requiresStatIntensity && !statIntensity && statIntensityOptions.length > 0) {
            // Select default stat intensity (usually Basic)
            const defaultIntensity = selectedMatchType?.defaultStatIntensity || selectedSubtype?.defaultStatIntensity || statIntensityOptions[0];
            if (defaultIntensity) {
                setStatIntensity(defaultIntensity);
            }
        }
        if (requiresBestOf && !bestOf) {
            // Set default best-of value
            const defaultBestOf = selectedSubtype?.defaultBestOf || 3;
            setBestOf(defaultBestOf);
        }
    }, [
        requiresTeamSize,
        requiresStatIntensity,
        requiresBestOf,
        teamSize,
        statIntensity,
        bestOf,
        fixedTeamSize,
        selectedMatchType,
        selectedSubtype,
        teamSizeOptions,
        statIntensityOptions,
        setTeamSize,
        setStatIntensity,
        setBestOf
    ]);
    const canProceed = canProceedStep2();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold",
                        children: "Match Configuration"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm mt-1",
                        children: "Define the structure and parameters of your match"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-semibold block mb-3",
                        children: "Match Type"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                        children: matchTypes.map((matchType)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$MatchTypeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchTypeCard"], {
                                config: matchType,
                                isSelected: matchTypeId === matchType.id,
                                onSelect: setMatchTypeId,
                                hasSubtypes: !!(matchType.subtypes && matchType.subtypes.length > 0)
                            }, matchType.id, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            subtypes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-semibold block mb-3",
                        children: [
                            selectedMatchType?.name,
                            " - Variations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                        children: subtypes.map((subtype)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SubtypeCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubtypeCard"], {
                                config: subtype,
                                isSelected: subtypeId === subtype.id,
                                onSelect: setSubtypeId
                            }, subtype.id, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (matchTypeId || subtypeId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-200"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            matchTypeId || subtypeId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$ModeToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModeToggle"], {
                selectedMode: mode,
                onSelectMode: setMode,
                disabled: false
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            (matchTypeId || subtypeId) && (requiresTeamSize || fixedTeamSize) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamSizePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TeamSizePicker"], {
                options: teamSizeOptions,
                selectedTeamSize: teamSize,
                onSelectTeamSize: setTeamSize,
                fixedSize: fixedTeamSize
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            (matchTypeId || subtypeId) && requiresStatIntensity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$StatIntensityPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatIntensityPicker"], {
                options: statIntensityOptions,
                selectedIntensity: statIntensity,
                onSelectIntensity: setStatIntensity
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            (matchTypeId || subtypeId) && requiresBestOf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$BestOfPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BestOfPicker"], {
                selectedBestOf: bestOf,
                onSelectBestOf: setBestOf
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            !canProceed && matchTypeId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800",
                children: "⚠️ Please complete all required fields to proceed"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocationConfigurator",
    ()=>LocationConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$parking$2d$meter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParkingMeter$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/parking-meter.js [app-ssr] (ecmascript) <export default as ParkingMeter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shower$2d$head$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShowerHead$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/shower-head.js [app-ssr] (ecmascript) <export default as ShowerHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/locationService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const LocationConfigurator = ({ selectedSport, selectedLocationId, onSelectLocation })=>{
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('distance');
    const [showAddLocation, setShowAddLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize mock data on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].initializeMockData();
    }, []);
    // Get filtered locations
    const locations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedSport) return [];
        // Get locations for this sport
        let filtered = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].getLocations({
            sports: [
                selectedSport
            ],
            search: search.trim(),
            type: []
        });
        // Sort
        if (sortBy === 'distance') {
            filtered.sort((a, b)=>{
                const distA = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].getDistance(a.id);
                const distB = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].getDistance(b.id);
                return distA - distB;
            });
        } else if (sortBy === 'active') {
            filtered.sort((a, b)=>(b.activePlayers?.length || 0) - (a.activePlayers?.length || 0));
        } else if (sortBy === 'name') {
            filtered.sort((a, b)=>a.name.localeCompare(b.name));
        }
        return filtered;
    }, [
        selectedSport,
        search,
        sortBy
    ]);
    // Get selected location
    const selectedLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>selectedLocationId ? locations.find((l)=>l.id === selectedLocationId) : undefined, [
        selectedLocationId,
        locations
    ]);
    // Get amenity icon
    const getAmenityIcon = (amenity)=>{
        switch(amenity){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Parking:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$parking$2d$meter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParkingMeter$3e$__["ParkingMeter"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                    lineNumber: 69,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Amenity"].Showers:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shower$2d$head$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShowerHead$3e$__["ShowerHead"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                    lineNumber: 71,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                    lineNumber: 73,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    // Get location type badge color
    const getLocationTypeColor = (type)=>{
        switch(type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Business:
                return 'bg-blue-100 text-blue-700';
            case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Community:
                return 'bg-green-100 text-green-700';
            case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationType"].Private:
                return 'bg-purple-100 text-purple-700';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Select a Location"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm mt-1",
                        children: [
                            "Choose a venue for your ",
                            selectedSport || 'match'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-3 w-5 h-5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search by name or address...",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSearch(''),
                                className: "absolute right-3 top-2.5 text-gray-400 hover:text-gray-600",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSortBy('distance'),
                                className: `px-3 py-1.5 rounded-full text-sm font-medium transition ${sortBy === 'distance' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                children: "Nearest"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSortBy('active'),
                                className: `px-3 py-1.5 rounded-full text-sm font-medium transition ${sortBy === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                children: "Most Active"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSortBy('name'),
                                className: `px-3 py-1.5 rounded-full text-sm font-medium transition ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            locations.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 max-h-96 overflow-y-auto",
                children: locations.map((location)=>{
                    const isSelected = selectedLocationId === location.id;
                    const distance = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].getDistance(location.id);
                    const activeCount = location.activePlayers?.length || 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectLocation(location.id),
                        className: `w-full text-left p-4 rounded-lg border-2 transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-gray-900",
                                                children: location.name
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                lineNumber: 177,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-4 h-4 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-600",
                                                        children: location.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 176,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0",
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 184,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 175,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-3 pt-3 border-t border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-1 rounded-full text-xs font-medium ${getLocationTypeColor(location.type)}`,
                                        children: location.type
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 193,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                className: "w-3 h-3 inline mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            distance.toFixed(1),
                                            " mi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 198,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    activeCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "w-3 h-3 inline mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                lineNumber: 206,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            activeCount,
                                            " players"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 205,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            location.amenities?.slice(0, 2).map((amenity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-gray-400 w-4 h-4",
                                                    children: getAmenityIcon(amenity)
                                                }, amenity, false, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))),
                                            location.amenities && location.amenities.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    "+",
                                                    location.amenities.length - 2
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                                lineNumber: 219,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                                lineNumber: 191,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, location.id, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 165,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 border-2 border-dashed border-gray-300 rounded-lg text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-8 h-8 text-gray-400 mx-auto mb-2"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 font-medium",
                        children: "No locations found"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mt-1",
                        children: selectedSport ? `No venues available for ${selectedSport} yet.` : 'Select a sport first.'
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 228,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowAddLocation(true),
                className: "w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Add New Location"
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-blue-900",
                        children: [
                            "✓ Location selected: ",
                            selectedLocation.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-700 mt-1",
                        children: selectedLocation.address
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !selectedLocationId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-yellow-800",
                        children: "Please select a location to proceed"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 256,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showAddLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg p-6 max-w-md w-full mx-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-gray-900 mb-4",
                            children: "Add New Location"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mb-4",
                            children: "Location creation will be implemented in a future step. For now, you can explore existing locations."
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowAddLocation(false),
                            className: "w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                            lineNumber: 270,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/lib/mockUsers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateMockUsers",
    ()=>generateMockUsers,
    "getMockUsers",
    ()=>getMockUsers,
    "getPlayerAvatar",
    ()=>getPlayerAvatar,
    "resetMockUsers",
    ()=>resetMockUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
;
function generateMockUsers() {
    const cities = [
        {
            lat: 40.7128,
            lng: -74.006
        },
        {
            lat: 40.715,
            lng: -73.98
        },
        {
            lat: 40.785,
            lng: -73.968
        },
        {
            lat: 40.72,
            lng: -73.97
        }
    ];
    const users = [
        // Basketball enthusiasts
        {
            id: 'user_hooper_1',
            name: 'Alex Johnson',
            username: 'hooper_alex',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[0],
            friends: [
                'user_hooper_2',
                'user_hooper_3',
                'user_soccer_1'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_downtown',
                    15
                ],
                [
                    'loc_basketball_eastside',
                    8
                ]
            ]),
            createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_hooper_2',
            name: 'Marcus Lee',
            username: 'ball_marcus',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[1],
            friends: [
                'user_hooper_1',
                'user_hooper_4'
            ],
            followers: [
                'user_hooper_1'
            ],
            locationCheckIns: new Map([
                [
                    'loc_basketball_downtown',
                    12
                ],
                [
                    'loc_community_basketball_1',
                    5
                ]
            ]),
            createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_hooper_3',
            name: 'Jamal Williams',
            username: 'buckets_jam',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[0],
            friends: [
                'user_hooper_1',
                'user_hooper_5'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_harlem',
                    20
                ],
                [
                    'loc_basketball_downtown',
                    4
                ]
            ]),
            createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_hooper_4',
            name: 'Chris Thompson',
            username: 'clutch_chris',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[2],
            friends: [
                'user_hooper_2'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_eastside',
                    10
                ],
                [
                    'loc_basketball_brooklyn',
                    7
                ]
            ]),
            createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_hooper_5',
            name: 'DeShawn Brown',
            username: 'prime_time',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'Brooklyn',
            coordinates: cities[3],
            friends: [
                'user_hooper_3'
            ],
            followers: [
                'user_hooper_3',
                'user_hooper_1'
            ],
            locationCheckIns: new Map([
                [
                    'loc_basketball_brooklyn',
                    18
                ],
                [
                    'loc_community_basketball_1',
                    3
                ]
            ]),
            createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Soccer players
        {
            id: 'user_soccer_1',
            name: 'David Martinez',
            username: 'striker_dave',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            city: 'New York',
            coordinates: cities[0],
            friends: [
                'user_hooper_1',
                'user_soccer_2'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_soccer_central',
                    9
                ]
            ]),
            createdAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_soccer_2',
            name: 'Ricardo Santos',
            username: 'goal_keeper_r',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            city: 'New York',
            coordinates: cities[1],
            friends: [
                'user_soccer_1',
                'user_soccer_3'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_soccer_central',
                    12
                ],
                [
                    'loc_soccer_westfield',
                    6
                ]
            ]),
            createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_soccer_3',
            name: 'João Silva',
            username: 'midfield_jo',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer,
            city: 'New York',
            coordinates: cities[0],
            friends: [
                'user_soccer_2'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_soccer_westfield',
                    8
                ]
            ]),
            createdAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Tennis players
        {
            id: 'user_tennis_1',
            name: 'Emma Wilson',
            username: 'serve_and_volley',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            city: 'New York',
            coordinates: cities[2],
            friends: [
                'user_tennis_2'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_tennis_uptown',
                    14
                ]
            ]),
            createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_tennis_2',
            name: 'Sophie Chen',
            username: 'court_master',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            city: 'New York',
            coordinates: cities[1],
            friends: [
                'user_tennis_1',
                'user_tennis_3'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_tennis_uptown',
                    11
                ]
            ]),
            createdAt: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_tennis_3',
            name: 'Isabella Garcia',
            username: 'ace_master',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis,
            city: 'New York',
            coordinates: cities[3],
            friends: [
                'user_tennis_2'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_tennis_uptown',
                    7
                ]
            ]),
            createdAt: new Date(Date.now() - 170 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Multi-sport players
        {
            id: 'user_multi_1',
            name: 'Jordan Park',
            username: 'all_around',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[0],
            friends: [
                'user_hooper_1',
                'user_tennis_1',
                'user_soccer_1'
            ],
            followers: [
                'user_hooper_2'
            ],
            locationCheckIns: new Map([
                [
                    'loc_basketball_downtown',
                    6
                ],
                [
                    'loc_multiplex_downtown',
                    10
                ]
            ]),
            createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_multi_2',
            name: 'Casey Morgan',
            username: 'active_casey',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball,
            city: 'New York',
            coordinates: cities[1],
            friends: [],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_volleyball_beach',
                    8
                ]
            ]),
            createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_multi_3',
            name: 'Taylor Brooks',
            username: 'sports_fan',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[3],
            friends: [],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_downtown',
                    4
                ],
                [
                    'loc_community_basketball_1',
                    6
                ]
            ]),
            createdAt: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000).toISOString()
        },
        // Additional players
        {
            id: 'user_casual_1',
            name: 'Michael Brown',
            username: 'weekend_warrior',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[0],
            friends: [],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_downtown',
                    2
                ]
            ]),
            createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_casual_2',
            name: 'Sarah Johnson',
            username: 'hoops_sarah',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[1],
            friends: [
                'user_casual_1'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_harlem',
                    5
                ]
            ]),
            createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_casual_3',
            name: 'Kevin Anderson',
            username: 'ballin_kev',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'Brooklyn',
            coordinates: cities[3],
            friends: [],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_basketball_brooklyn',
                    4
                ]
            ]),
            createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'user_casual_4',
            name: 'Nicole Davis',
            username: 'court_baller',
            primarySport: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball,
            city: 'New York',
            coordinates: cities[2],
            friends: [
                'user_hooper_3'
            ],
            followers: [],
            locationCheckIns: new Map([
                [
                    'loc_community_basketball_1',
                    7
                ]
            ]),
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];
    return users;
}
function getPlayerAvatar(player) {
    if (player.avatarUrl) {
        return player.avatarUrl;
    }
    // Generate initials avatar (e.g., "AJ" from "Alex Johnson")
    const names = player.name.split(' ');
    const initials = names.map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
    return initials;
}
/**
 * Mock user store for testing
 */ let mockUsersCache = null;
function getMockUsers() {
    if (!mockUsersCache) {
        mockUsersCache = generateMockUsers();
    }
    return mockUsersCache;
}
function resetMockUsers() {
    mockUsersCache = null;
}
}),
"[project]/Athlee/apps/web/src/lib/playerSuggestionService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playerSuggestionService",
    ()=>playerSuggestionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockUsers.ts [app-ssr] (ecmascript)");
;
/**
 * PlayerSuggestionService
 * Ranks and filters available players for match team composition
 * Priority: Friends > Regulars at location > Same sport players > Nearby players
 */ class PlayerSuggestionService {
    /**
   * Get ranked player suggestions based on context
   */ getSuggestions(context) {
        const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUsers"])();
        // Filter out current user and already excluded players
        let candidates = allUsers.filter((user)=>user.id !== context.currentUserId && !context.excludePlayerIds?.includes(user.id));
        // Filter by search query if provided
        if (context.searchQuery && context.searchQuery.trim()) {
            const query = context.searchQuery.toLowerCase();
            candidates = candidates.filter((user)=>user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query));
        }
        // Convert to player suggestions and rank
        const suggestions = candidates.map((user)=>this.userToPlayerSuggestion(user, context));
        // Sort by ranking score (descending)
        suggestions.sort((a, b)=>b.rankingScore - a.rankingScore);
        // Return top suggestions (limit to 20)
        return suggestions.slice(0, 20);
    }
    /**
   * Convert mock user profile to player suggestion with ranking
   */ userToPlayerSuggestion(user, context) {
        let category = 'suggested';
        let rankingScore = 0;
        let mutualFriendsCount = 0;
        let recentMatches = 0;
        let isFriend = false;
        let isRegular = false;
        let nearbyScore = 0;
        // Check if friend
        const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUsers"])().find((u)=>u.id === context.currentUserId);
        if (currentUser && currentUser.friends.includes(user.id)) {
            category = 'friend';
            isFriend = true;
            rankingScore = 1000;
            mutualFriendsCount = this.getMutualFriendsCount(currentUser, user);
            rankingScore += mutualFriendsCount * 50; // Bonus for mutual friends
        }
        // Check if regular at selected location
        if (context.locationId && user.locationCheckIns.has(context.locationId)) {
            recentMatches = user.locationCheckIns.get(context.locationId) || 0;
            if (!isFriend) {
                category = 'regular';
                rankingScore = 800 + recentMatches * 10;
            } else {
                rankingScore += recentMatches * 10; // Bonus if also friend and regular
            }
            isRegular = true;
        }
        // Check if plays same sport
        if (!isFriend && !isRegular && context.sport) {
            if (user.primarySport === context.sport) {
                category = 'sport';
                rankingScore = 500;
            }
        }
        // Check proximity (nearby players)
        if (!isFriend && !isRegular && user.coordinates && context.locationId) {
            nearbyScore = this.calculateProximityScore(user.coordinates, context.locationId);
            if (nearbyScore > 0) {
                if (category !== 'friend' && category !== 'regular') {
                    category = 'nearby';
                }
                rankingScore = Math.max(rankingScore, 300 + nearbyScore);
            }
        }
        return {
            id: user.id,
            name: user.name,
            userId: user.id,
            avatarUrl: user.avatarUrl,
            category,
            rankingScore,
            mutualFriendsCount,
            recentMatches: isRegular ? recentMatches : undefined,
            isFriend,
            isRegular,
            nearbyScore: nearbyScore > 0 ? nearbyScore : undefined,
            claimed: !!user.id
        };
    }
    /**
   * Count mutual friends between two users
   */ getMutualFriendsCount(user1, user2) {
        const user1Friends = new Set(user1.friends);
        return user2.friends.filter((friendId)=>user1Friends.has(friendId)).length;
    }
    /**
   * Calculate proximity score based on location
   * This is a simplified calculation - in real app would use actual distance
   */ calculateProximityScore(userCoordinates, _locationId) {
        // Simplified: Random score between 0-200
        // In real implementation, would calculate actual distance
        return Math.floor(Math.random() * 200);
    }
    /**
   * Get location regular players
   */ getLocationRegulars(locationId, excludePlayerIds) {
        const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUsers"])();
        const regulars = allUsers.filter((user)=>user.locationCheckIns.has(locationId) && !excludePlayerIds?.includes(user.id)).map((user)=>{
            const checkIns = user.locationCheckIns.get(locationId) || 0;
            return {
                id: user.id,
                name: user.name,
                userId: user.id,
                avatarUrl: user.avatarUrl,
                category: 'regular',
                rankingScore: 800 + checkIns * 10,
                recentMatches: checkIns,
                isRegular: true,
                claimed: true
            };
        });
        regulars.sort((a, b)=>b.rankingScore - a.rankingScore);
        return regulars;
    }
    /**
   * Get friend suggestions
   */ getFriendSuggestions(currentUserId, excludePlayerIds) {
        const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUsers"])();
        const currentUser = allUsers.find((u)=>u.id === currentUserId);
        if (!currentUser) {
            return [];
        }
        const friends = allUsers.filter((user)=>currentUser.friends.includes(user.id) && !excludePlayerIds?.includes(user.id)).map((user)=>({
                id: user.id,
                name: user.name,
                userId: user.id,
                avatarUrl: user.avatarUrl,
                category: 'friend',
                rankingScore: 1000,
                isFriend: true,
                claimed: true
            }));
        return friends;
    }
    /**
   * Search for players by name or username
   */ searchPlayers(query, excludePlayerIds) {
        if (!query || query.trim().length === 0) {
            return [];
        }
        const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUsers"])();
        const queryLower = query.toLowerCase();
        const results = allUsers.filter((user)=>(user.name.toLowerCase().includes(queryLower) || user.username.toLowerCase().includes(queryLower)) && !excludePlayerIds?.includes(user.id)).map((user)=>({
                id: user.id,
                name: user.name,
                userId: user.id,
                avatarUrl: user.avatarUrl,
                category: 'suggested',
                rankingScore: user.name.toLowerCase().startsWith(queryLower) ? 600 : 400,
                claimed: true
            }));
        results.sort((a, b)=>b.rankingScore - a.rankingScore);
        return results;
    }
}
const playerSuggestionService = new PlayerSuggestionService();
}),
"[project]/Athlee/apps/web/src/lib/tempPlayerService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tempPlayerService",
    ()=>tempPlayerService
]);
/**
 * TempPlayerService
 * Creates temporary/guest players who can be added to match teams
 * Useful for adding unregistered or walk-in players
 */ class TempPlayerService {
    tempPlayerCounter = 0;
    /**
   * Create a temporary player (guest/walk-in)
   */ createTempPlayer(name, options) {
        const id = this.generateTempId();
        return {
            id,
            name,
            userId: undefined,
            avatarUrl: undefined,
            position: options?.position,
            jerseyNo: options?.jerseyNo,
            claimed: false
        };
    }
    /**
   * Generate unique temporary ID
   */ generateTempId() {
        this.tempPlayerCounter += 1;
        return `temp_${Date.now()}_${this.tempPlayerCounter}`;
    }
    /**
   * Check if a player is temporary
   */ isTemporaryPlayer(player) {
        return player.id.startsWith('temp_') && !player.claimed;
    }
    /**
   * Convert temporary player to claimed (registered) player
   */ claimTempPlayer(player, userId) {
        return {
            ...player,
            userId,
            claimed: true
        };
    }
    /**
   * Reset counter (useful for testing)
   */ resetCounter() {
        this.tempPlayerCounter = 0;
    }
}
const tempPlayerService = new TempPlayerService();
}),
"[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayerChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockUsers.ts [app-ssr] (ecmascript)");
;
;
;
const getPositionInitial = (position)=>{
    const initials = {
        'Guard': 'G',
        'Forward': 'F',
        'Center': 'C',
        'Other': 'O'
    };
    return position ? initials[position] || 'O' : '';
};
function PlayerChip(props) {
    const { player, onRemove, onUpdate, isSubstitute = false, competitiveMode = false } = props;
    const [showEditForm, setShowEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editData, setEditData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        jerseyNo: player.jerseyNo || '',
        position: player.position || '',
        isCaptain: player.isCaptain || false
    });
    const handleSaveEdit = ()=>{
        onUpdate({
            jerseyNo: editData.jerseyNo || undefined,
            position: editData.position || undefined,
            isCaptain: editData.isCaptain
        });
        setShowEditForm(false);
    };
    const avatarInitials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlayerAvatar"])(player);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-3 p-2 rounded-lg bg-white border border-gray-200 transition-all ${isSubstitute ? 'opacity-75' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold",
                children: avatarInitials
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-900 truncate flex-1",
                                children: player.name
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            competitiveMode && player.jerseyNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded",
                                children: [
                                    "#",
                                    player.jerseyNo
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            competitiveMode && player.position && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded",
                                children: getPositionInitial(player.position)
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            player.isCaptain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded",
                                children: "C"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    !player.claimed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-amber-600 font-medium mt-1",
                        children: "Guest Player"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowEditForm(true),
                        className: "p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors",
                        title: "Edit player details",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors",
                        title: "Remove player",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            showEditForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-gray-900",
                            children: "Edit Player"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                competitiveMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Jersey Number"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: editData.jerseyNo,
                                            onChange: (e)=>setEditData({
                                                    ...editData,
                                                    jerseyNo: e.target.value
                                                }),
                                            placeholder: "e.g., 23",
                                            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 131,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this),
                                competitiveMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Position"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 146,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 flex-wrap",
                                            children: [
                                                'Guard',
                                                'Forward',
                                                'Center',
                                                'Other'
                                            ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditData({
                                                            ...editData,
                                                            position: pos
                                                        }),
                                                    className: `px-3 py-2 rounded text-sm font-medium transition-colors ${editData.position === pos ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                                    children: pos[0]
                                                }, pos, false, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "captain",
                                            checked: editData.isCaptain,
                                            onChange: (e)=>setEditData({
                                                    ...editData,
                                                    isCaptain: e.target.checked
                                                }),
                                            className: "w-4 h-4 rounded border-gray-300 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "captain",
                                            className: "text-sm font-medium text-gray-700",
                                            children: "Make Captain"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowEditForm(false),
                                    className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveEdit,
                                    className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamColumn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$PlayerChip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/PlayerChip.tsx [app-ssr] (ecmascript)");
;
;
;
function TeamColumn(props) {
    const { team, isSelected, onSelect, onRemovePlayer, onUpdatePlayer, onUpdateTeamName, canAddPlayer, onAddPlayerClick, maxPlayersPerTeam, maxSubstitutes, competitiveMode } = props;
    const [isEditingName, setIsEditingName] = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [tmpName, setTmpName] = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(team.name);
    const handleNameChange = (newName)=>{
        if (newName.trim()) {
            onUpdateTeamName(team.id, newName.trim());
        }
        setIsEditingName(false);
    };
    // Separate players into main squad and substitutes
    const mainSquad = team.players.slice(0, maxPlayersPerTeam);
    const substitutes = team.players.slice(maxPlayersPerTeam);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onSelect,
        className: `p-6 rounded-lg border-2 transition-all cursor-pointer ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    isEditingName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        autoFocus: true,
                        type: "text",
                        value: tmpName,
                        onChange: (e)=>setTmpName(e.target.value),
                        onBlur: ()=>handleNameChange(tmpName),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') handleNameChange(tmpName);
                            if (e.key === 'Escape') setIsEditingName(false);
                        },
                        className: "flex-1 px-2 py-1 border border-gray-300 rounded font-bold text-lg",
                        onClick: (e)=>e.stopPropagation()
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        onClick: ()=>setIsEditingName(true),
                        className: "text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors",
                        children: team.name
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-gray-500",
                        children: [
                            team.players.length,
                            "/",
                            maxPlayersPerTeam + maxSubstitutes
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                        children: [
                            "Squad (",
                            mainSquad.length,
                            "/",
                            maxPlayersPerTeam,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 bg-gray-50 p-3 rounded min-h-[120px]",
                        children: [
                            mainSquad.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$PlayerChip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    player: player,
                                    onRemove: ()=>onRemovePlayer(team.id, player.id),
                                    onUpdate: (updates)=>onUpdatePlayer(team.id, player.id, updates),
                                    competitiveMode: competitiveMode
                                }, player.id, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)),
                            mainSquad.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 italic",
                                children: "No players yet"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            maxSubstitutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                        children: [
                            "Substitutes (",
                            substitutes.length,
                            "/",
                            maxSubstitutes,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 bg-gray-50 p-3 rounded min-h-[80px] opacity-75",
                        children: [
                            substitutes.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$PlayerChip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    player: player,
                                    onRemove: ()=>onRemovePlayer(team.id, player.id),
                                    onUpdate: (updates)=>onUpdatePlayer(team.id, player.id, updates),
                                    isSubstitute: true,
                                    competitiveMode: competitiveMode
                                }, player.id, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)),
                            substitutes.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 italic",
                                children: "No substitutes"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this),
            canAddPlayer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: (e)=>{
                    e.stopPropagation();
                    onAddPlayerClick();
                },
                className: "w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                children: "+ Add Player"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            !canAddPlayer && team.players.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800 text-center font-medium",
                children: "Team is full"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayerSearchModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockUsers.ts [app-ssr] (ecmascript)");
;
;
;
function PlayerSearchModal(props) {
    const { suggestions, onSelectPlayer, onClose } = props;
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filter suggestions based on search and category
    const filteredSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let results = [
            ...suggestions
        ];
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter((s)=>s.name.toLowerCase().includes(query) || s.userId && s.userId.toLowerCase().includes(query));
        }
        // Filter by category
        if (selectedCategory) {
            results = results.filter((s)=>s.category === selectedCategory);
        }
        return results;
    }, [
        suggestions,
        searchQuery,
        selectedCategory
    ]);
    // Get unique categories
    const categories = Array.from(new Set(suggestions.map((s)=>s.category)));
    // Get category display info
    const getCategoryInfo = (category)=>{
        const icons = {
            friend: '👥',
            regular: '⭐',
            sport: '⚽',
            nearby: '📍',
            suggested: '💡'
        };
        const names = {
            friend: 'Friends',
            regular: 'Location Regulars',
            sport: 'Same Sport',
            nearby: 'Nearby',
            suggested: 'Suggested'
        };
        return {
            icon: icons[category] || '•',
            name: names[category] || category
        };
    };
    const handleSelectPlayer = (player)=>{
        onSelectPlayer(player);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-6 border-b border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-gray-900",
                            children: "Add Player"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-600 hover:text-gray-900 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                    children: "Search Players"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    placeholder: "Search by name or username...",
                                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        categories.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                    children: "Filter by Category"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedCategory(null),
                                            className: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                            children: "All"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        categories.map((cat)=>{
                                            const info = getCategoryInfo(cat);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedCategory(cat),
                                                className: `px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: info.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 23
                                                    }, this),
                                                    info.name
                                                ]
                                            }, cat, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                lineNumber: 133,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 max-h-96 overflow-y-auto",
                            children: filteredSuggestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: suggestions.length === 0 ? 'No players available' : 'No players match your search'
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this) : filteredSuggestions.map((player)=>{
                                const info = getCategoryInfo(player.category);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleSelectPlayer(player),
                                    className: "w-full flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockUsers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlayerAvatar"])(player)
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                            lineNumber: 171,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-gray-900",
                                                    children: player.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded",
                                                            children: [
                                                                info.icon,
                                                                " ",
                                                                info.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 25
                                                        }, this),
                                                        player.isFriend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded",
                                                            children: "Friend"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 27
                                                        }, this),
                                                        player.isRegular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded",
                                                            children: [
                                                                player.recentMatches,
                                                                " matches"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                            lineNumber: 176,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600 font-medium",
                                                children: [
                                                    "Score: ",
                                                    player.rankingScore
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                                lineNumber: 197,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                            lineNumber: 196,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, player.id, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                                    lineNumber: 165,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-t border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewPlayerForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function NewPlayerForm(props) {
    const { onCreatePlayer, onClose, competitiveMode = false } = props;
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        jerseyNo: '',
        position: ''
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!formData.name.trim()) return;
        onCreatePlayer(formData.name.trim(), {
            jerseyNo: formData.jerseyNo || undefined,
            position: formData.position || undefined
        });
        // Reset form
        setFormData({
            name: '',
            jerseyNo: '',
            position: ''
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg max-w-sm w-full p-6",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-gray-900 mb-4",
                    children: "Add New Player"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "name",
                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                    children: "Player Name *"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "name",
                                    value: formData.name,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        }),
                                    placeholder: "Enter player name",
                                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                    autoFocus: true,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        competitiveMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "jersey",
                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                    children: "Jersey Number"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "jersey",
                                    value: formData.jerseyNo,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            jerseyNo: e.target.value
                                        }),
                                    placeholder: "e.g., 23",
                                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        competitiveMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                    children: "Position"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 87,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 flex-wrap",
                                    children: [
                                        {
                                            label: 'Guard',
                                            value: 'Guard'
                                        },
                                        {
                                            label: 'Forward',
                                            value: 'Forward'
                                        },
                                        {
                                            label: 'Center',
                                            value: 'Center'
                                        },
                                        {
                                            label: 'Other',
                                            value: 'Other'
                                        }
                                    ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFormData({
                                                    ...formData,
                                                    position: pos.value
                                                }),
                                            className: `px-3 py-2 rounded text-sm font-medium transition-colors ${formData.position === pos.value ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                            children: pos.label[0]
                                        }, pos.value, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                            lineNumber: 92,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 90,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800",
                            children: "ℹ This player will be added as a guest and can be claimed later."
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !formData.name.trim(),
                                    className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors",
                                    children: "Add Player"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$playerSuggestionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/playerSuggestionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$tempPlayerService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/tempPlayerService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamColumn$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/TeamColumn.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$PlayerSearchModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/PlayerSearchModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$NewPlayerForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/NewPlayerForm.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
function TeamBuilder() {
    const { session, addTeamPlayer, removeTeamPlayer, updateTeamPlayer, updateTeamName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [selectedTeamId, setSelectedTeamId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(session.teams.length > 0 ? session.teams[0].id : null);
    const [showSearchModal, setShowSearchModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNewPlayerForm, setShowNewPlayerForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get all currently added player IDs to exclude from suggestions
    const allTeamPlayerIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return session.teams.flatMap((team)=>team.players.map((p)=>p.id));
    }, [
        session.teams
    ]);
    // Get player suggestions for the selected team
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedTeamId || !session.sport || !session.locationId) {
            return [];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$playerSuggestionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["playerSuggestionService"].getSuggestions({
            currentUserId: session.userId || 'current-user',
            locationId: session.locationId,
            sport: session.sport,
            excludePlayerIds: allTeamPlayerIds
        });
    }, [
        selectedTeamId,
        session.sport,
        session.locationId,
        session.userId,
        allTeamPlayerIds
    ]);
    // Handle adding a player to the selected team
    const handleAddPlayer = (player)=>{
        if (!selectedTeamId) return;
        // Check if team can still accept players
        const team = session.teams.find((t)=>t.id === selectedTeamId);
        if (!team) return;
        const totalSlots = maxPlayersPerTeam + maxSubstitutes;
        if (team.players.length >= totalSlots) {
            // Team is full, can't add
            return;
        }
        addTeamPlayer(selectedTeamId, player);
    };
    // Handle removing a player from a team
    const handleRemovePlayer = (teamId, playerId)=>{
        removeTeamPlayer(teamId, playerId);
    };
    // Handle updating a player (e.g., jersey number, position)
    const handleUpdatePlayer = (teamId, playerId, updates)=>{
        updateTeamPlayer(teamId, playerId, updates);
    };
    // Handle creating a new temporary player
    const handleCreatePlayer = (name, options)=>{
        const tempPlayer = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$tempPlayerService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tempPlayerService"].createTempPlayer(name, options);
        handleAddPlayer(tempPlayer);
        setShowNewPlayerForm(false);
    };
    // Get max players allowed in a team
    const maxPlayersPerTeam = session.teamSize ? session.teamSize.playersPerTeam : 0;
    const maxSubstitutes = session.teamSize ? session.teamSize.substitutes || 0 : 0;
    // Check if a team can accept more players
    const canAddPlayer = (teamId)=>{
        const team = session.teams.find((t)=>t.id === teamId);
        if (!team) return false;
        const totalSlots = maxPlayersPerTeam + maxSubstitutes;
        return team.players.length < totalSlots;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Build Your Teams"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-600",
                        children: [
                            "Add players to each team. ",
                            session.mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive ? `Each team needs at least ${maxPlayersPerTeam} player${maxPlayersPerTeam !== 1 ? 's' : ''}.` : 'Each team needs at least 1 player.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
                children: session.teams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamColumn$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        team: team,
                        isSelected: selectedTeamId === team.id,
                        onSelect: ()=>setSelectedTeamId(team.id),
                        onRemovePlayer: handleRemovePlayer,
                        onUpdatePlayer: handleUpdatePlayer,
                        onUpdateTeamName: updateTeamName,
                        canAddPlayer: canAddPlayer(team.id),
                        onAddPlayerClick: ()=>setShowSearchModal(true),
                        maxPlayersPerTeam: maxPlayersPerTeam,
                        maxSubstitutes: maxSubstitutes,
                        competitiveMode: session.mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive
                    }, team.id, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowSearchModal(true),
                        disabled: !selectedTeamId || !canAddPlayer(selectedTeamId || ''),
                        className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium",
                        children: "Add Existing Player"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowNewPlayerForm(true),
                        disabled: !selectedTeamId || !canAddPlayer(selectedTeamId || ''),
                        className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium",
                        children: "Add New Player"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            showSearchModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$PlayerSearchModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                suggestions: suggestions,
                onSelectPlayer: handleAddPlayer,
                onClose: ()=>setShowSearchModal(false)
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this),
            showNewPlayerForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$NewPlayerForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onCreatePlayer: handleCreatePlayer,
                onClose: ()=>setShowNewPlayerForm(false),
                competitiveMode: session.mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VolleyballRulesConfigurator",
    ()=>VolleyballRulesConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockVolleyballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
;
const VolleyballRulesConfigurator = ({ onNext })=>{
    const { session, setRules } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [rules, setLocalRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(session.rules || {
        presetName: 'Custom',
        setsToWin: 2,
        pointsPerSet: 25,
        winByTwo: true,
        rallyScoring: true,
        liberoAllowed: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRules(rules);
    }, [
        rules,
        setRules
    ]);
    const handleApplyPreset = (presetName)=>{
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLLEYBALL_PRESETS"].find((p)=>p.name === presetName);
        if (preset) {
            setLocalRules(preset.rules);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-2",
                        children: "Volleyball Rules"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Configure match rules or select a preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-4",
                        children: "Select a Preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockVolleyballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLLEYBALL_PRESETS"].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleApplyPreset(preset.name),
                                className: `p-3 rounded-lg transition-all ${rules.presetName === preset.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-400'}`,
                                title: preset.description,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-sm",
                                    children: preset.name
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, preset.name, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Sets to Win"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3",
                                children: [
                                    2,
                                    3,
                                    5
                                ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                setsToWin: num
                                            }),
                                        className: `p-3 rounded-lg border-2 transition-all ${rules.setsToWin === num ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: num === 2 ? 'Best of 3' : num === 3 ? 'Best of 5' : 'Best of 9'
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, num, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Points Per Set"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: [
                                    15,
                                    21,
                                    25
                                ].map((points)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                pointsPerSet: points
                                            }),
                                        className: `p-3 rounded-lg border-2 transition-all ${rules.pointsPerSet === points ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: points
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, points, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Win by 2 Points"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    true,
                                    false
                                ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                winByTwo: value
                                            }),
                                        className: `px-6 py-3 rounded-lg border-2 transition-all ${rules.winByTwo === value ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: value ? 'Yes' : 'No'
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, String(value), false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Libero Allowed"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    true,
                                    false
                                ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                liberoAllowed: value
                                            }),
                                        className: `px-6 py-3 rounded-lg border-2 transition-all ${rules.liberoAllowed === value ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: value ? 'Yes' : 'No'
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, String(value), false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-blue-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Rally Scoring:"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Always enabled. Points awarded on every rally regardless of who served."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-gray-900 mb-2",
                        children: "Current Rules Summary"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Preset: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: rules.presetName
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                        lineNumber: 167,
                                        columnNumber: 24
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Format: Best of ",
                                    rules.setsToWin * 2 - 1,
                                    " sets to ",
                                    rules.pointsPerSet,
                                    " points"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Win by 2: ",
                                    rules.winByTwo ? 'Yes' : 'No'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Libero: ",
                                    rules.liberoAllowed ? 'Allowed' : 'Not allowed'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseballRulesConfigurator",
    ()=>BaseballRulesConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockBaseballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
;
const BaseballRulesConfigurator = ({ onNext })=>{
    const { session, setRules } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [rules, setLocalRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(session.rules || {
        presetName: 'Custom',
        innings: 9,
        designatedHitter: true,
        extraInningsFormat: 'standard'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRules(rules);
    }, [
        rules,
        setRules
    ]);
    const handleApplyPreset = (presetName)=>{
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASEBALL_PRESETS"].find((p)=>p.name === presetName);
        if (preset) {
            setLocalRules(preset.rules);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-2",
                        children: "Baseball Rules"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Configure match rules or select a preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-4",
                        children: "Select a Preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockBaseballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASEBALL_PRESETS"].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleApplyPreset(preset.name),
                                className: `p-3 rounded-lg transition-all ${rules.presetName === preset.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-400'}`,
                                title: preset.description,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-sm",
                                    children: preset.name
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, preset.name, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Number of Innings"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: [
                                    6,
                                    7,
                                    9
                                ].map((innings)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                innings
                                            }),
                                        className: `p-3 rounded-lg border-2 transition-all ${rules.innings === innings ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: [
                                                innings,
                                                " Innings"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, innings, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Designated Hitter (DH)"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    true,
                                    false
                                ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                designatedHitter: value
                                            }),
                                        className: `px-6 py-3 rounded-lg border-2 transition-all ${rules.designatedHitter === value ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: value ? 'Yes' : 'No'
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, String(value), false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 mt-2",
                                children: "Designated hitter bats in place of pitcher"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Mercy Rule"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "mercyRule",
                                                checked: !rules.mercyRule,
                                                onChange: ()=>setLocalRules({
                                                        ...rules,
                                                        mercyRule: undefined
                                                    }),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 117,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-gray-900",
                                                        children: "No Mercy Rule"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-600",
                                                        children: "Game continues to full innings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 124,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "mercyRule",
                                                checked: !!rules.mercyRule,
                                                onChange: ()=>setLocalRules({
                                                        ...rules,
                                                        mercyRule: {
                                                            runDifference: 10,
                                                            afterInning: 5
                                                        }
                                                    }),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-gray-900",
                                                        children: "Enable Mercy Rule"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-600",
                                                        children: "Game ends if lead ≥ 10 runs after 5 innings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Extra Innings Format"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    {
                                        value: 'standard',
                                        label: 'Standard',
                                        desc: 'Regular inning play'
                                    },
                                    {
                                        value: 'runnerOnSecond',
                                        label: 'Runner on 2nd',
                                        desc: 'Start with runner on second base (MLB 2020+)'
                                    }
                                ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "extraInnings",
                                                checked: rules.extraInningsFormat === option.value,
                                                onChange: ()=>setLocalRules({
                                                        ...rules,
                                                        extraInningsFormat: option.value
                                                    }),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-gray-900",
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-600",
                                                        children: option.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, option.value, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-gray-900 mb-2",
                        children: "Current Rules Summary"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Preset: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: rules.presetName
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                        lineNumber: 184,
                                        columnNumber: 24
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Format: ",
                                    rules.innings,
                                    " innings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Designated Hitter: ",
                                    rules.designatedHitter ? 'Yes' : 'No'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Mercy Rule: ",
                                    rules.mercyRule ? `${rules.mercyRule.runDifference}+ runs after inning ${rules.mercyRule.afterInning}` : 'Disabled'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Extra Innings: ",
                                    rules.extraInningsFormat === 'runnerOnSecond' ? 'Runner on 2nd' : 'Standard'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmericanFootballRulesConfigurator",
    ()=>AmericanFootballRulesConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockFootballRulePresets.ts [app-ssr] (ecmascript)");
;
;
;
;
const AmericanFootballRulesConfigurator = ({ onNext })=>{
    const { session, setRules } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [rules, setLocalRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(session.rules || {
        presetName: 'Custom',
        quarterDuration: 12,
        quarters: 4,
        overtimeFormat: 'suddenDeath',
        twoPointConversion: true,
        timeoutsPerHalf: 3
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRules(rules);
    }, [
        rules,
        setRules
    ]);
    const handleApplyPreset = (presetName)=>{
        const preset = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOOTBALL_PRESETS"].find((p)=>p.name === presetName);
        if (preset) {
            setLocalRules(preset.rules);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-2",
                        children: "American Football Rules"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Configure match rules or select a preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-4",
                        children: "Select a Preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockFootballRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOOTBALL_PRESETS"].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleApplyPreset(preset.name),
                                className: `p-3 rounded-lg transition-all ${rules.presetName === preset.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-400'}`,
                                title: preset.description,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-sm",
                                    children: preset.name
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, preset.name, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Quarter Duration (minutes)"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: [
                                    12,
                                    15,
                                    10
                                ].map((duration)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                quarterDuration: duration
                                            }),
                                        className: `p-3 rounded-lg border-2 transition-all ${rules.quarterDuration === duration ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: [
                                                duration,
                                                " min"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, duration, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Timeouts Per Half"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4
                                ].map((timeouts)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                timeoutsPerHalf: timeouts
                                            }),
                                        className: `p-3 rounded-lg border-2 transition-all ${rules.timeoutsPerHalf === timeouts ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: timeouts
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, timeouts, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Two-Point Conversion Allowed"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    true,
                                    false
                                ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLocalRules({
                                                ...rules,
                                                twoPointConversion: value
                                            }),
                                        className: `px-6 py-3 rounded-lg border-2 transition-all ${rules.twoPointConversion === value ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: value ? 'Yes' : 'No'
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, String(value), false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-semibold text-gray-900 mb-3",
                                children: "Overtime Format"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    {
                                        value: 'suddenDeath',
                                        label: 'Sudden Death',
                                        desc: 'First to score wins'
                                    },
                                    {
                                        value: 'college',
                                        label: 'College OT',
                                        desc: 'Team alternates possessions from 25-yard line'
                                    },
                                    {
                                        value: 'none',
                                        label: 'No Overtime',
                                        desc: 'Game ends in tie'
                                    }
                                ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "overtime",
                                                checked: rules.overtimeFormat === option.value,
                                                onChange: ()=>setLocalRules({
                                                        ...rules,
                                                        overtimeFormat: option.value
                                                    }),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                                lineNumber: 145,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-gray-900",
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-600",
                                                        children: option.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, option.value, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-blue-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Quarters:"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Fixed at 4 quarters per regulation game"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-gray-900 mb-2",
                        children: "Current Rules Summary"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Preset: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: rules.presetName
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                        lineNumber: 176,
                                        columnNumber: 24
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Game: 4 quarters × ",
                                    rules.quarterDuration,
                                    " minutes (",
                                    rules.quarterDuration * 4,
                                    " min total)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Timeouts: ",
                                    rules.timeoutsPerHalf,
                                    " per half (",
                                    rules.timeoutsPerHalf * 2,
                                    " total)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Two-Point Conversion: ",
                                    rules.twoPointConversion ? 'Allowed' : 'Not allowed'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "• Overtime: ",
                                    rules.overtimeFormat === 'suddenDeath' ? 'Sudden Death' : rules.overtimeFormat === 'college' ? 'College Format' : 'No Overtime'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RulesConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/mockRulePresets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/location-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$VolleyballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/VolleyballRulesConfigurator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$BaseballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/BaseballRulesConfigurator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$AmericanFootballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/AmericanFootballRulesConfigurator.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function RulesConfigurator(props) {
    const { sport = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball } = props;
    // Dispatch to sport-specific configurators
    switch(sport){
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Volleyball:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$VolleyballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VolleyballRulesConfigurator"], {}, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 26,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Baseball:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$BaseballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseballRulesConfigurator"], {}, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].American_Football:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$AmericanFootballRulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmericanFootballRulesConfigurator"], {}, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 30,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Basketball:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Soccer:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Tennis:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Badminton:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$location$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportType"].Pickleball:
        default:
            // Fall back to generic component for other sports (to be implemented)
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GenericRulesConfigurator, {
                sport: sport
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 38,
                columnNumber: 14
            }, this);
    }
}
/**
 * GenericRulesConfigurator - Fallback for sports not yet with custom UI
 * Uses preset selection and basic customization
 */ function GenericRulesConfigurator({ sport }) {
    const { session, setRules } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [currentTab, setCurrentTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('timing');
    const [rules, setLocalRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(session.rules || {
        presetName: 'Custom',
        gameFormat: 'timed',
        periodStructure: 'quarters',
        periodDuration: 10,
        overtimeFormat: '5min',
        shotClock: '24',
        pointsInside: 2,
        pointsOutside: 3,
        freeThrowValue: 1,
        personalFoulLimit: '5',
        teamFoulLimit: '4perQtr',
        bonusAfter: '5',
        technicalFoulValue: '1ftPos',
        flagrantFoulPenalty: '2ftPos',
        backcourt: '8',
        threeSecondViolation: 'both',
        goaltendingAllowed: true,
        travelingCalled: true,
        doubleDribbleCalled: true,
        timeoutStructure: 'fiba',
        substitutions: 'unlimited',
        shotClockResetAfter: 'made',
        jumpBallRule: 'alternating',
        houseRules: []
    });
    const [presets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$mockRulePresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRulePresetsBySport"])(sport));
    const [validationErrors, setValidationErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Update local rules in store
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRules(rules);
    }, [
        rules,
        setRules
    ]);
    const handleUpdateField = (field, value)=>{
        setLocalRules((prev)=>({
                ...prev,
                [field]: value
            }));
        setValidationErrors([]);
    };
    const applyPreset = (presetName)=>{
        const preset = presets.find((p)=>p.name === presetName);
        if (preset) {
            setLocalRules(preset.rules);
            setValidationErrors([]);
        }
    };
    const resetToPreset = ()=>{
        const preset = presets.find((p)=>p.name === rules.presetName);
        if (preset) {
            setLocalRules(preset.rules);
        }
    };
    const tabs = [
        {
            id: 'timing',
            label: 'Timing',
            icon: '⏱️'
        },
        {
            id: 'scoring',
            label: 'Scoring',
            icon: '🎯'
        },
        {
            id: 'fouls',
            label: 'Fouls',
            icon: '🚫'
        },
        {
            id: 'violations',
            label: 'Violations',
            icon: '⚠️'
        },
        {
            id: 'gameplay',
            label: 'Gameplay',
            icon: '🏀'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-2",
                        children: "Configure Rules"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Customize the match rules or select a preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-4",
                        children: "Select a Preset"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4",
                        children: presets.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>applyPreset(preset.name),
                                className: `p-3 rounded-lg transition-all ${rules.presetName === preset.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-400'}`,
                                title: preset.description,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-sm",
                                    children: preset.name
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this)
                            }, preset.name, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetToPreset,
                        className: "text-sm text-gray-600 hover:text-gray-900 underline",
                        children: [
                            "Reset to ",
                            rules.presetName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 overflow-x-auto",
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setCurrentTab(tab.id),
                            className: `px-4 py-3 font-medium whitespace-nowrap transition-colors ${currentTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`,
                            children: [
                                tab.icon,
                                " ",
                                tab.label
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            validationErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
                children: validationErrors.map((error, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-700",
                        children: [
                            "• ",
                            error
                        ]
                    }, i, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    currentTab === 'timing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-3",
                                        children: "Game Format"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-3",
                                        children: [
                                            'timed',
                                            'firstTo',
                                            'untimed'
                                        ].map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleUpdateField('gameFormat', format),
                                                className: `p-3 rounded-lg border-2 transition-all ${rules.gameFormat === format ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold capitalize",
                                                    children: format
                                                }, void 0, false, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 21
                                                }, this)
                                            }, format, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            rules.gameFormat === 'timed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Period Structure"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 211,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: rules.periodStructure || 'quarters',
                                                onChange: (e)=>handleUpdateField('periodStructure', e.target.value),
                                                className: "w-full p-2 border border-gray-300 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "quarters",
                                                        children: "Quarters"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "halves",
                                                        children: "Halves"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 210,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Period Duration (minutes)"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: rules.periodDuration || 10,
                                                onChange: (e)=>handleUpdateField('periodDuration', parseInt(e.target.value)),
                                                className: "w-full p-2 border border-gray-300 rounded-lg",
                                                children: [
                                                    8,
                                                    10,
                                                    12,
                                                    15,
                                                    20
                                                ].map((val)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: val,
                                                        children: [
                                                            val,
                                                            " minutes"
                                                        ]
                                                    }, val, true, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 228,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Overtime Format"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: rules.overtimeFormat || '5min',
                                                onChange: (e)=>handleUpdateField('overtimeFormat', e.target.value),
                                                className: "w-full p-2 border border-gray-300 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "none",
                                                        children: "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "5min",
                                                        children: "5 minutes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "7min",
                                                        children: "7 minutes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "10min",
                                                        children: "10 minutes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 245,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            rules.gameFormat === 'firstTo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Winning Score"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-5 gap-2 mb-3",
                                                children: [
                                                    11,
                                                    15,
                                                    21,
                                                    25,
                                                    30
                                                ].map((val)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleUpdateField('winningScore', val),
                                                        className: `p-2 rounded-lg border-2 ${rules.winningScore === val ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`,
                                                        children: val
                                                    }, val, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "1",
                                                max: "100",
                                                value: rules.winningScore || 21,
                                                onChange: (e)=>handleUpdateField('winningScore', parseInt(e.target.value)),
                                                className: "w-full p-2 border border-gray-300 rounded-lg",
                                                placeholder: "Or enter custom score"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                id: "winByTwo",
                                                checked: rules.winByTwo || false,
                                                onChange: (e)=>handleUpdateField('winByTwo', e.target.checked),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 293,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "winByTwo",
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Win by 2 Points"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 300,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Overtime Limit (points, 0 = none)"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                value: rules.overtimeLimit || 0,
                                                onChange: (e)=>handleUpdateField('overtimeLimit', parseInt(e.target.value)),
                                                className: "w-full p-2 border border-gray-300 rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    currentTab === 'scoring' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Shot Clock"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-2 mb-3",
                                        children: [
                                            'none',
                                            '12',
                                            '24',
                                            '30',
                                            '35'
                                        ].map((val)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleUpdateField('shotClock', val),
                                                className: `p-2 rounded-lg border-2 ${rules.shotClock === val ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`,
                                                children: val === 'none' ? 'None' : `${val}s`
                                            }, val, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-3",
                                        children: "Scoring Points"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs text-gray-600",
                                                        children: "Inside"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: rules.pointsInside || 2,
                                                        onChange: (e)=>handleUpdateField('pointsInside', parseInt(e.target.value)),
                                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 1,
                                                                children: "1 point"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 2,
                                                                children: "2 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 3,
                                                                children: "3 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 358,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs text-gray-600",
                                                        children: "Outside"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: rules.pointsOutside || 3,
                                                        onChange: (e)=>handleUpdateField('pointsOutside', parseInt(e.target.value)),
                                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 1,
                                                                children: "1 point"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 2,
                                                                children: "2 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 369,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 3,
                                                                children: "3 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 4,
                                                                children: "4 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 361,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs text-gray-600",
                                                        children: "Free Throw"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: rules.freeThrowValue || 1,
                                                        onChange: (e)=>handleUpdateField('freeThrowValue', e.target.value === 'none' ? 'none' : parseInt(e.target.value)),
                                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 1,
                                                                children: "1 point"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: 2,
                                                                children: "2 points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Shot Clock Reset After"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.shotClockResetAfter || 'made',
                                        onChange: (e)=>handleUpdateField('shotClockResetAfter', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "made",
                                                children: "Made Shot"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 400,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "rim",
                                                children: "Rim Touch"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "Never"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 391,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    currentTab === 'fouls' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Personal Foul Limit"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.personalFoulLimit || '5',
                                        onChange: (e)=>handleUpdateField('personalFoulLimit', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "4",
                                                children: "4 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 421,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "5",
                                                children: "5 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "6",
                                                children: "6 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 415,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Team Foul Limit"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 428,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.teamFoulLimit || '4perQtr',
                                        onChange: (e)=>handleUpdateField('teamFoulLimit', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 436,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "4perQtr",
                                                children: "4 per quarter"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "5perQtr",
                                                children: "5 per quarter"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "7perHalf",
                                                children: "7 per half"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 439,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "5perHalf",
                                                children: "5 per half"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 440,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 431,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Bonus After (Team Fouls)"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.bonusAfter || '5',
                                        onChange: (e)=>handleUpdateField('bonusAfter', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "4",
                                                children: "4 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "5",
                                                children: "5 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 455,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "7",
                                                children: "7 fouls"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Technical Foul Value"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.technicalFoulValue || '1ftPos',
                                        onChange: (e)=>handleUpdateField('technicalFoulValue', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 469,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "1ftPos",
                                                children: "1 FT + Possession"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 470,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "1ftOnly",
                                                children: "1 FT Only"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2ftPos",
                                                children: "2 FT + Possession"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 472,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Flagrant Foul Penalty"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.flagrantFoulPenalty || '2ftPos',
                                        onChange: (e)=>handleUpdateField('flagrantFoulPenalty', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 485,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2ftPos",
                                                children: "2 FT + Possession"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 486,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ejection2ft",
                                                children: "Ejection + 2 FT"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 487,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 476,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 410,
                        columnNumber: 11
                    }, this),
                    currentTab === 'violations' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Backcourt Time"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 497,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.backcourt || '8',
                                        onChange: (e)=>handleUpdateField('backcourt', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "Not Called"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "8",
                                                children: "8 seconds"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "10",
                                                children: "10 seconds"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 505,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 498,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 496,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "3-Second Violation"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.threeSecondViolation || 'both',
                                        onChange: (e)=>handleUpdateField('threeSecondViolation', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "Not Called"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 518,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "defensive3",
                                                children: "Defensive Only"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "offensive3",
                                                children: "Offensive Only"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "both",
                                                children: "Both"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 521,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 509,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        id: "goaltending",
                                        checked: rules.goaltendingAllowed || false,
                                        onChange: (e)=>handleUpdateField('goaltendingAllowed', e.target.checked),
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "goaltending",
                                        className: "text-sm font-medium text-gray-900",
                                        children: "Goaltending Allowed"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        id: "traveling",
                                        checked: rules.travelingCalled || false,
                                        onChange: (e)=>handleUpdateField('travelingCalled', e.target.checked),
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "traveling",
                                        className: "text-sm font-medium text-gray-900",
                                        children: "Traveling Called"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 546,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        id: "doubleDribble",
                                        checked: rules.doubleDribbleCalled || false,
                                        onChange: (e)=>handleUpdateField('doubleDribbleCalled', e.target.checked),
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 552,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "doubleDribble",
                                        className: "text-sm font-medium text-gray-900",
                                        children: "Double Dribble Called"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 559,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 551,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 495,
                        columnNumber: 11
                    }, this),
                    currentTab === 'gameplay' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Timeout Structure"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 570,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.timeoutStructure || 'fiba',
                                        onChange: (e)=>handleUpdateField('timeoutStructure', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 578,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "fiba",
                                                children: "FIBA"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 579,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "nba",
                                                children: "NBA"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ncaa",
                                                children: "NCAA"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "hs",
                                                children: "High School"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 582,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "custom",
                                                children: "Custom"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 583,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 573,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 569,
                                columnNumber: 13
                            }, this),
                            rules.timeoutStructure === 'custom' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Timeouts per Half"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 590,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                max: "10",
                                                value: rules.customTimeoutsPerHalf || 1,
                                                onChange: (e)=>handleUpdateField('customTimeoutsPerHalf', parseInt(e.target.value)),
                                                className: "w-full p-2 border border-gray-300 rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 589,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Timeouts per OT"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 604,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                max: "5",
                                                value: rules.customTimeoutsPerOT || 1,
                                                onChange: (e)=>handleUpdateField('customTimeoutsPerOT', parseInt(e.target.value)),
                                                className: "w-full p-2 border border-gray-300 rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 607,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 603,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                id: "carryOver",
                                                checked: rules.customTimeoutsCanCarryOver || false,
                                                onChange: (e)=>handleUpdateField('customTimeoutsCanCarryOver', e.target.checked),
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 618,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "carryOver",
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Timeouts Can Carry Over"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 627,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 617,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-semibold text-gray-900 mb-2",
                                                children: "Timeout Duration"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 633,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: rules.customTimeoutDuration || '60',
                                                onChange: (e)=>handleUpdateField('customTimeoutDuration', e.target.value),
                                                className: "w-full p-2 border border-gray-300 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "30",
                                                        children: "30 seconds"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "60",
                                                        children: "1 minute"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "75",
                                                        children: "75 seconds"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "100",
                                                        children: "100 seconds (1:40)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 636,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 632,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Substitutions"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.substitutions || 'unlimited',
                                        onChange: (e)=>handleUpdateField('substitutions', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "none",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 659,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "unlimited",
                                                children: "Unlimited"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 660,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "limited7",
                                                children: "Limited (7 per team)"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 661,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "limited10",
                                                children: "Limited (10 per team)"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 662,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "hockey",
                                                children: "Hockey Style"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 663,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 654,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 650,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "Jump Ball Rule"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 668,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: rules.jumpBallRule || 'alternating',
                                        onChange: (e)=>handleUpdateField('jumpBallRule', e.target.value),
                                        className: "w-full p-2 border border-gray-300 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "tipoff",
                                                children: "Tipoff"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 676,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "alternating",
                                                children: "Alternating"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 677,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "alwaysJump",
                                                children: "Always Jump"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this),
                            rules.houseRules && rules.houseRules.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-semibold text-gray-900 mb-2",
                                        children: "House Rules (Location-Specific)"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 684,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: rules.houseRules.map((rule, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-amber-50 border border-amber-200 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: [
                                                        "• ",
                                                        rule
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 23
                                                }, this)
                                            }, i, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                                lineNumber: 689,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                        lineNumber: 687,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                                lineNumber: 683,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                        lineNumber: 568,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/lib/profileService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * User profile for display in match officials selection
 */ __turbopack_context__.s([
    "profileService",
    ()=>profileService
]);
/**
 * Mock user database for profile service
 */ const MOCK_USERS = [
    {
        userId: 'user_001',
        username: 'john_doe',
        name: 'John Doe',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
        userId: 'user_002',
        username: 'sarah_smith',
        name: 'Sarah Smith',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
        userId: 'user_003',
        username: 'michael_brown',
        name: 'Michael Brown',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    {
        userId: 'user_004',
        username: 'emily_jones',
        name: 'Emily Jones',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    {
        userId: 'user_005',
        username: 'david_wilson',
        name: 'David Wilson',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    {
        userId: 'user_006',
        username: 'jessica_taylor',
        name: 'Jessica Taylor',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica'
    },
    {
        userId: 'user_007',
        username: 'james_anderson',
        name: 'James Anderson',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    },
    {
        userId: 'user_008',
        username: 'lisa_martinez',
        name: 'Lisa Martinez',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    {
        userId: 'user_009',
        username: 'robert_garcia',
        name: 'Robert Garcia',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    {
        userId: 'user_010',
        username: 'amanda_lee',
        name: 'Amanda Lee',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda'
    },
    {
        userId: 'user_011',
        username: 'christopher_king',
        name: 'Christopher King',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher'
    },
    {
        userId: 'user_012',
        username: 'sophia_white',
        name: 'Sophia White',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'
    }
];
/**
 * Profile Service - Handles user profile operations and search
 */ class ProfileService {
    /**
   * Search users by query string (username or name)
   * @param query Search term (case-insensitive)
   * @returns Array of matching users
   */ searchUsers(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }
        const lowerQuery = query.toLowerCase();
        return MOCK_USERS.filter((user)=>user.username.toLowerCase().includes(lowerQuery) || user.name.toLowerCase().includes(lowerQuery)).map((user)=>({
                userId: user.userId,
                username: user.username,
                name: user.name,
                avatarUrl: user.avatarUrl
            }));
    }
    /**
   * Get user profile by ID
   * @param userId User ID to retrieve
   * @returns User profile or undefined if not found
   */ getUserById(userId) {
        return MOCK_USERS.find((user)=>user.userId === userId);
    }
    /**
   * Get all users
   * @returns All users in the system
   */ getAllUsers() {
        return [
            ...MOCK_USERS
        ];
    }
    /**
   * Get multiple users by IDs
   * @param userIds Array of user IDs
   * @returns Array of user profiles
   */ getUsersByIds(userIds) {
        return userIds.map((id)=>this.getUserById(id)).filter((user)=>user !== undefined);
    }
    /**
   * Check if a user exists
   * @param userId User ID to check
   * @returns true if user exists
   */ userExists(userId) {
        return MOCK_USERS.some((user)=>user.userId === userId);
    }
}
const profileService = new ProfileService();
}),
"[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OfficialsStep",
    ()=>OfficialsStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$profileService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/profileService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
'use client';
;
;
;
;
;
/**
 * Card component for displaying assigned officials
 */ const AssignedPersonCard = ({ userId, userName, userUsername, onRemove, isPrimaryRecorder })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold",
                        children: userName?.charAt(0).toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-sm text-gray-900 truncate",
                                children: userName
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 truncate",
                                children: [
                                    "@",
                                    userUsername
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isPrimaryRecorder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full whitespace-nowrap",
                        children: "Primary"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onRemove,
                className: "ml-2 p-1 hover:bg-gray-200 rounded transition-colors",
                "aria-label": "Remove person",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-4 h-4 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
/**
 * Modal component for searching and selecting users
 */ const UserSearchModal = ({ isOpen, onClose, onSelect, excludeUserIds = [], title = 'Select User' })=>{
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleSearch = (query)=>{
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const results = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$profileService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].searchUsers(query).filter((user)=>!excludeUserIds.includes(user.userId));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };
    const handleSelect = (userId)=>{
        onSelect(userId);
        setSearchQuery('');
        setSearchResults([]);
        onClose();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-end z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1 hover:bg-gray-100 rounded transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search by name or username...",
                            value: searchQuery,
                            onChange: (e)=>handleSearch(e.target.value),
                            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: searchResults.length > 0 ? searchResults.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSelect(user.userId),
                            className: "w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold",
                                    children: user.name.charAt(0).toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-sm",
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                                "@",
                                                user.username
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, user.userId, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))) : searchQuery.trim().length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center py-8 text-gray-500 text-sm",
                        children: "No users found"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center py-8 text-gray-500 text-sm",
                        children: "Start typing to search for users"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
/**
 * Role section component for organizing officials by role
 */ const RoleSection = ({ title, description, icon, children, onAdd, addButtonLabel = 'Add', showAddButton = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg border border-gray-200 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-blue-600 mt-1",
                            children: icon
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-gray-900",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                    lineNumber: 170,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: children
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showAddButton && onAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onAdd,
                className: "mt-4 w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors",
                children: [
                    "+ ",
                    addButtonLabel
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
/**
 * Primary recorder selector component
 */ const PrimaryRecorderSelector = ({ primaryRecorderId, onChangeRecorder })=>{
    const profile = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$profileService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].getUserById(primaryRecorderId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-4 py-3 bg-purple-50 rounded-lg border border-purple-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold",
                        children: profile?.name.charAt(0).toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-sm text-gray-900",
                                children: profile?.name
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: [
                                    "@",
                                    profile?.username
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onChangeRecorder,
                className: "px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-100 rounded transition-colors",
                children: "Change"
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const OfficialsStep = ({ onNext = ()=>{}, onBack = ()=>{}, onSkip = ()=>{} })=>{
    const { session, addReferee, removeReferee, setPrimaryRecorder, setOfficials } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    const [isUserSearchOpen, setIsUserSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchContext, setSearchContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('referees');
    const officials = session.officials || {
        referees: [],
        primaryRecorder: session.userId || 'current-user',
        secondaryRecorders: []
    };
    // Initialize officials if not set
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!session.officials) {
            setOfficials({
                referees: [],
                primaryRecorder: session.userId || 'current-user',
                secondaryRecorders: []
            });
        }
    }, []);
    const handleAddReferee = ()=>{
        setSearchContext('referees');
        setIsUserSearchOpen(true);
    };
    const handleAddPrimaryRecorder = ()=>{
        setSearchContext('recorder');
        setIsUserSearchOpen(true);
    };
    const handleSelectUser = (userId)=>{
        if (searchContext === 'referees') {
            addReferee(userId);
        } else if (searchContext === 'recorder') {
            setPrimaryRecorder(userId);
        }
    };
    const refereeProfiles = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$profileService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].getUsersByIds(officials.referees);
    const primaryRecorderProfile = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$profileService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].getUserById(officials.primaryRecorder);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-2xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: "Officials & Recording"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Assign referees and stat recorders for this match"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleSection, {
                    title: "Referees",
                    description: "Assign 1-3 referees for this match",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 291,
                        columnNumber: 17
                    }, void 0),
                    onAdd: handleAddReferee,
                    addButtonLabel: "Add Referee",
                    showAddButton: officials.referees.length < 3,
                    children: refereeProfiles.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: refereeProfiles.map((profile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AssignedPersonCard, {
                                userId: profile.userId,
                                userName: profile.name,
                                userUsername: profile.username,
                                onRemove: ()=>removeReferee(profile.userId)
                            }, profile.userId, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                                lineNumber: 299,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 297,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-4 text-center text-gray-500 text-sm",
                        children: 'No referees assigned yet. Click "Add Referee" to get started.'
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 309,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleSection, {
                    title: "Stat Recorder",
                    description: "Primary stat recorder for official match records",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 321,
                        columnNumber: 17
                    }, void 0),
                    children: primaryRecorderProfile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryRecorderSelector, {
                        primaryRecorderId: officials.primaryRecorder,
                        onChangeRecorder: handleAddPrimaryRecorder
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 324,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-4 text-center text-gray-500 text-sm",
                        children: "No primary recorder assigned"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 329,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                    lineNumber: 318,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 justify-between pt-6 border-t border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors",
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onSkip,
                        className: "px-4 py-2 text-gray-600 text-sm hover:text-gray-900 font-medium underline",
                        children: "Skip"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        className: "px-6 py-2 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors",
                        children: "Next →"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserSearchModal, {
                isOpen: isUserSearchOpen,
                onClose: ()=>setIsUserSearchOpen(false),
                onSelect: handleSelectUser,
                excludeUserIds: [
                    ...officials.referees,
                    officials.primaryRecorder
                ],
                title: searchContext === 'referees' ? 'Add Referee' : 'Change Stat Recorder'
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SummaryCard",
    ()=>SummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Edit2>");
'use client';
;
;
function SummaryCard({ title, icon, children, onEdit, isEmpty = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:border-gray-300 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-4 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-1",
                        children: [
                            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                                lineNumber: 28,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-gray-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    onEdit && !isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onEdit,
                        className: "flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Edit"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-700",
                children: isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 italic",
                    children: "No details added"
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this) : children
            }, void 0, false, {
                fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamSummary",
    ()=>TeamSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function TeamSummary({ teams, collapsible = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: teams.map((team, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: team.name
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded",
                                children: [
                                    team.players.length,
                                    " player",
                                    team.players.length !== 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-sm text-gray-700 space-y-1",
                        children: [
                            team.players.slice(0, collapsible ? 3 : undefined).map((player, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-400",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                            lineNumber: 29,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: player.name
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                            lineNumber: 30,
                                            columnNumber: 17
                                        }, this),
                                        player.jerseyNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                                "#",
                                                player.jerseyNo
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                            lineNumber: 32,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, player.id || idx, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                    lineNumber: 28,
                                    columnNumber: 15
                                }, this)),
                            collapsible && team.players.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-xs text-gray-500 italic",
                                children: [
                                    "+",
                                    team.players.length - 3,
                                    " more"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                ]
            }, team.id, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinalizationStep",
    ()=>FinalizationStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/SummaryCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/TeamSummary.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function FinalizationStep({ match, location, rules, officials, schedule, privacy, mode, onScheduleChange, onPrivacyChange, onEditStep }) {
    const isLive = schedule === null;
    const [showConfirmation, setShowConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Format schedule date
    const scheduleDate = schedule ? new Date(schedule) : null;
    const scheduleDateStr = scheduleDate ? scheduleDate.toISOString().split('T')[0] : '';
    const scheduleTimeStr = scheduleDate ? scheduleDate.toISOString().split('T')[1].substring(0, 5) : '';
    const handleScheduleChange = (e)=>{
        const dateStr = e.target.value;
        if (dateStr) {
            const date = new Date(dateStr);
            if (scheduleTimeStr) {
                const [hours, minutes] = scheduleTimeStr.split(':');
                date.setHours(parseInt(hours), parseInt(minutes));
            } else {
                date.setHours(18, 0); // Default to 6 PM if no time set
            }
            onScheduleChange(date);
        }
    };
    const handleTimeChange = (e)=>{
        const timeStr = e.target.value;
        if (timeStr && schedule) {
            const [hours, minutes] = timeStr.split(':');
            const newDate = new Date(schedule);
            newDate.setHours(parseInt(hours), parseInt(minutes));
            onScheduleChange(newDate);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Review & Create Match"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mt-1",
                        children: "Confirm all details before creating your match"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900",
                        children: "Match Summary"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Sport",
                        icon: "🏀",
                        onEdit: ()=>onEditStep?.(0),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-gray-900",
                                children: match.sport
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Match Configuration",
                        icon: "📋",
                        onEdit: ()=>onEditStep?.(1),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: match.type
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        match.mode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-600",
                                            children: [
                                                " · ",
                                                match.mode
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 107,
                                            columnNumber: 30
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                match.teamSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                        "Team Size: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: match.teamSize.label
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 111,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Location",
                        icon: "📍",
                        onEdit: ()=>onEditStep?.(2),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-gray-900",
                                    children: location.name
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: location.address
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Teams",
                        icon: "👥",
                        onEdit: ()=>onEditStep?.(3),
                        isEmpty: !match.teams || match.teams.length === 0,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TeamSummary"], {
                            teams: match.teams || [],
                            collapsible: true
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Rules",
                        icon: "⚙️",
                        onEdit: ()=>onEditStep?.(4),
                        isEmpty: !rules,
                        children: rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-gray-900",
                                    children: rules.presetName
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 space-y-1",
                                    children: [
                                        'shotClock' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Shot clock: ",
                                                rules.shotClock,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 153,
                                            columnNumber: 44
                                        }, this),
                                        'pointsInside' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Points inside: ",
                                                rules.pointsInside,
                                                "pt · Outside: ",
                                                rules.pointsOutside,
                                                "pt"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 154,
                                            columnNumber: 47
                                        }, this),
                                        'personalFoulLimit' in rules && rules.personalFoulLimit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Personal fouls: ",
                                                rules.personalFoulLimit
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this),
                                        'setsToWin' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Sets to win: ",
                                                rules.setsToWin
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 159,
                                            columnNumber: 44
                                        }, this),
                                        'pointsPerSet' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Points per set: ",
                                                rules.pointsPerSet
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 160,
                                            columnNumber: 47
                                        }, this),
                                        'innings' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Innings: ",
                                                rules.innings
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 162,
                                            columnNumber: 42
                                        }, this),
                                        'quarterDuration' in rules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "• Quarter duration: ",
                                                rules.quarterDuration,
                                                "min"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 164,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SummaryCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryCard"], {
                        title: "Officials",
                        icon: "👨‍⚖️",
                        onEdit: ()=>onEditStep?.(5),
                        isEmpty: !officials,
                        children: officials && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                officials.referees && officials.referees.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Referees:"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 182,
                                            columnNumber: 21
                                        }, this),
                                        officials.referees.map((ref, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    idx > 0 ? ', ' : ' ',
                                                    ref
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 184,
                                                columnNumber: 23
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 181,
                                    columnNumber: 19
                                }, this),
                                officials.primaryRecorder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Primary Recorder:"
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                            lineNumber: 193,
                                            columnNumber: 21
                                        }, this),
                                        " ",
                                        officials.primaryRecorder
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                    lineNumber: 192,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                            lineNumber: 179,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-gray-200 rounded-lg p-6 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-gray-900",
                        children: "Schedule"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        checked: isLive,
                                        onChange: ()=>onScheduleChange(null),
                                        className: "w-4 h-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Play Now"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Start match immediately"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 216,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        checked: !isLive,
                                        onChange: ()=>onScheduleChange(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
                                        className: "w-4 h-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Schedule for Later"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Pick date and time"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 229,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    !isLive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-900 mb-2",
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: scheduleDateStr,
                                        onChange: handleScheduleChange,
                                        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-900 mb-2",
                                        children: "Time"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        value: scheduleTimeStr,
                                        onChange: handleTimeChange,
                                        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-gray-200 rounded-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-gray-900 mb-4",
                        children: "Privacy"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        checked: privacy === 'public',
                                        onChange: ()=>onPrivacyChange('public'),
                                        className: "w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Public"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Anyone can see and join this match"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 271,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        checked: privacy === 'invite',
                                        onChange: ()=>onPrivacyChange('invite'),
                                        className: "w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Invite Only"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Only invited players can join"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        checked: privacy === 'private',
                                        onChange: ()=>onPrivacyChange('private'),
                                        className: "w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-900",
                                                children: "Private"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: "Only you and invited participants"
                                            }, void 0, false, {
                                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            mode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                        className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-blue-900",
                                children: mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive ? 'Competitive Mode' : 'Casual Mode'
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-blue-800 mt-1",
                                children: mode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive ? 'This match requires jersey numbers and stricter rule enforcement' : 'This is a casual match with minimal validation'
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this),
            (!match.teams || match.teams.length === 0 || !location) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-amber-900",
                                children: "Incomplete Match"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-amber-800 mt-1",
                                children: "Please complete all required sections before creating the match."
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/Athlee/apps/web/src/app/matches/create/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatchCreatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/Athlee/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/store/matchSetupStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$matchService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/matchService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/locationService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/lib/match-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SportPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/SportPicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$MatchTypeConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/MatchTypeConfigurator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$LocationConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/LocationConfigurator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/TeamBuilder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$RulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/RulesConfigurator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$OfficialsStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/OfficialsStep.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$FinalizationStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Athlee/apps/web/src/components/match/FinalizationStep.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const STEPS = [
    'Sport',
    'Config',
    'Location',
    'Teams',
    'Rules',
    'Officials',
    'Finalize'
];
function MatchCreatePage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { session, setStep, resetSession, setSport, setLocation, setTeams, setRules, setOfficials, setSchedule, setPrivacy, initializeSession, canProceedStep2, canProceedStep4 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$store$2f$matchSetupStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchSetupStore"])();
    // Initialize session on page load
    __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        initializeSession('current-user', false);
    }, [
        initializeSession
    ]);
    const currentStep = session.step;
    const selectedSport = session.sport;
    const selectedMode = session.mode;
    const selectedTeamSize = session.teamSize;
    const selectedStatIntensity = session.statIntensity;
    const selectedLocation = session.locationId;
    const teams = session.teams;
    const rules = session.rules;
    const officials = session.officials;
    const schedule = session.schedule;
    const privacy = session.privacy;
    // For backward compatibility with old MatchType field (derives from matchTypeId)
    // This is used in match creation below
    const selectedMatchType = (()=>{
        const typeMap = {
            'single': __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Single,
            'set-based': __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].SetBased,
            'tournament': __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Tournament,
            'rotational': __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchType"].Rotational
        };
        return session.matchTypeId ? typeMap[session.matchTypeId] : undefined;
    })();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // All 7 steps are always present (Officials only shown if Competitive mode)
    // Step visibility handled via conditional rendering, not via step count
    const visibleSteps = STEPS;
    const canProceed = ()=>{
        switch(currentStep){
            case 0:
                return !!selectedSport;
            case 1:
                return canProceedStep2();
            case 2:
                return !!selectedLocation;
            case 3:
                return canProceedStep4();
            case 4:
                return !!rules;
            case 5:
                return selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual || !!officials && officials.referees.length > 0;
            case 6:
                return true;
            default:
                return false;
        }
    };
    const handleNext = ()=>{
        if (!canProceed()) return;
        let nextStep = currentStep + 1;
        // Skip Step 5 (Officials) for Casual mode
        if (currentStep === 4 && selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual) {
            nextStep = 6; // Jump to Finalize
        }
        if (nextStep <= visibleSteps.length - 1) {
            setStep(nextStep);
        }
    };
    const handleBack = ()=>{
        if (currentStep === 0) return;
        let prevStep = currentStep - 1;
        // Skip Step 5 (Officials) for Casual mode when going back
        if (currentStep === 6 && selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Casual) {
            prevStep = 4; // Jump back to Rules
        }
        if (prevStep >= 0) {
            setStep(prevStep);
        }
    };
    const handleCreateMatch = async ()=>{
        if (!canProceed()) {
            setError('Please complete all required fields');
            return;
        }
        try {
            setLoading(true);
            setError('');
            const matchData = {
                sport: selectedSport,
                type: selectedMatchType,
                mode: selectedMode,
                teamSize: selectedTeamSize,
                statIntensity: selectedStatIntensity,
                locationId: selectedLocation,
                teams: teams,
                rules: rules || {
                    scoringSystem: __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScoringSystem"].Standard,
                    pointsToWin: 21,
                    winByTwo: true
                },
                officials: selectedMode === __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive ? officials : undefined,
                status: schedule === null ? __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchStatus"].InProgress : __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchStatus"].Scheduled,
                date: schedule?.toISOString() || new Date().toISOString(),
                privacy: privacy || 'public',
                createdBy: 'current-user'
            };
            const match = __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$matchService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchService"].createMatch(matchData);
            resetSession();
            router.push(`/matches/${match.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create match. Please try again.');
            setLoading(false);
        }
    };
    const handleCancel = ()=>{
        resetSession();
        router.back();
    };
    const handleEditStep = (stepNum)=>{
        setStep(stepNum);
    };
    const renderStep = ()=>{
        switch(currentStep){
            case 0:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$SportPicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SportPicker"], {
                        selected: selectedSport,
                        onSelect: setSport
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this);
            case 1:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$MatchTypeConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchTypeConfigurator"], {}, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this);
            case 2:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$LocationConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocationConfigurator"], {
                    selectedSport: selectedSport,
                    selectedLocationId: selectedLocation,
                    onSelectLocation: setLocation
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this);
            case 3:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$TeamBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this);
            case 4:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$RulesConfigurator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sport: selectedSport
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, this);
            case 5:
                // Officials - only show in competitive mode
                if (selectedMode !== __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$match$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchMode"].Competitive) {
                    return null;
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$OfficialsStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OfficialsStep"], {
                    onNext: handleNext,
                    onBack: handleBack,
                    onSkip: handleNext
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, this);
            case 6:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$components$2f$match$2f$FinalizationStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FinalizationStep"], {
                        match: {
                            sport: selectedSport,
                            type: selectedMatchType,
                            mode: selectedMode,
                            teamSize: selectedTeamSize,
                            teams: teams
                        },
                        location: selectedLocation ? __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$apps$2f$web$2f$src$2f$lib$2f$locationService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationService"].getLocationById(selectedLocation) || undefined : undefined,
                        rules: rules,
                        officials: officials,
                        schedule: schedule,
                        privacy: privacy,
                        mode: selectedMode,
                        onScheduleChange: setSchedule,
                        onPrivacyChange: setPrivacy,
                        onEditStep: handleEditStep
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 232,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-gray-50 to-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-40 bg-white border-b border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mx-auto px-4 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCancel,
                                className: "text-gray-600 hover:text-gray-900",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-lg font-semibold text-gray-900 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        className: "w-5 h-5 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this),
                                    "Create Match"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6"
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mx-auto px-4 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center gap-2",
                                children: visibleSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex-1 h-1 rounded-full transition-colors ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`
                                        }, void 0, false, {
                                            fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    }, step, false, {
                                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-xs text-gray-500 text-center",
                                children: [
                                    "Step ",
                                    currentStep + 1,
                                    " of ",
                                    visibleSteps.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto px-4 py-8",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    renderStep(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 flex gap-3 justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleBack,
                                disabled: currentStep === 0,
                                className: "flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this),
                                    "Back"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            currentStep === visibleSteps.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCreateMatch,
                                disabled: loading || !canProceed(),
                                className: "flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    loading ? 'Creating...' : 'Create Match'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                disabled: !canProceed(),
                                className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                children: [
                                    "Next",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid gap-2",
                        style: {
                            gridTemplateColumns: `repeat(${visibleSteps.length}, 1fr)`
                        },
                        children: visibleSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Athlee$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-xs py-2 px-2 rounded text-center font-medium transition-colors ${index === currentStep ? 'bg-blue-100 text-blue-700' : index < currentStep ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`,
                                children: step
                            }, step, false, {
                                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Athlee/apps/web/src/app/matches/create/page.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c1a8320c._.js.map