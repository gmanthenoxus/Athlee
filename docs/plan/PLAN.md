# Athlehub - Professional Sports Management Platform

## Features
- **User Registration &Authentication**: Sign up and login with email/password


## User Authentication
1. CLASS DIAGRAM
    +---------------------+
    |       User          |
    +---------------------+
    | id: string          |
    | email: string       |
    | passwordHash: string|
    | name: string        |
    | accountType: enum   |
    | accountFlags:enum |
    | profile: UserProfile|
    | createdAt: Date     |
    | lastLogin: Date     |
    +---------------------+
            |
            ▼
    +---------------------------+
    |    UserProfile            |
    +---------------------------+
    | username: string          |
    | avatarUrl: string         |
    | bio: string               |
    | primarySport: enum        |
    | followers: User[]         |
    | following: User[]         |
    | isPublicStats: boolean;   |
    | isPublicBadges: boolean;  |
    +-------------------------+

2. CONTEXT FLOW
    [User Registration Screen]
            |
            V
    [AuthService] ---> [User DB]
            |
            V
    [UserProfileInitializer] → [Feed | Match | Location system]

    Interacts With:
        BadgeEngine (awards “Getting Started”)
        Location System (sets sport preference for local filters)
        Feed System (for social updates)


3. SEQUENCE DIAGRAM
    User → AuthScreen → AuthService → UserDB
    User ← Token ← AuthService ← UserDB

    User → SetupProfileScreen → UserProfileService → ProfileDB

4. SCREEN CONFIGURATION
    - RegisterScreen.tsx

    | Element	        |  Type           |
    |------------------ | --------------- |
    | EmailField	    | TextInput       |
    | PasswordField     | PasswordInput   |
    | ContinueButton    | Button          |
    | TermsCheck	    | Checkbox        |

    - SetupProfileScreen.tsx

    | Element        | Type        |
    | -------------- | ----------- |
    | UsernameInput  | TextInput   |
    | SportPicker    | Select      |
    | AvatarUploader | ImagePicker |
    | ContinueButton | Button      |

5. RELATIONSHIP

    | Related Feature      | Interaction Type     |
    | -------------------- | -------------------- |
    | Match Setup          | Pulls `primarySport` |
    | Badge System         | Assigns badges       |
    | Feed System          | Uses `UserProfile`   |
    | Community Membership | Based on profile     |

6. RECOMMENDATION
 Consider offering social auth (Google/Apple) in future to streamline onboarding.
 Allow temporary account creation for quick match logging.

7. NEW FEATURE NEEDED
 Account Switching System
Required for switching between Organizer and Player mode in-app (affects navigation and feature access).
 


8. CLASSES

    class User {
        id: string;
        email: string;
        passwordHash: string;
        accountType: AccountType;
        createdAt: Date;
        lastLogin: Date;
        profile: UserProfile;
        stats: UserStats;

        accountFlags: {
            dualRoleEnabled?: boolean;        
            isVerifiedOrganizer?: boolean;
            isVerifiedBusiness?: boolean;
        };
    }

    enum AccountType {
        Regular = "Regular",
        Competitive = "Competitive",
        Organizer = "Organizer",
        BusinessOwner = "BusinessOwner"
    }


## Profile Customization & Social Identity

1. CLASS DIAGRAM
    +---------------------+
    |     UserProfile     |
    +---------------------+
    | userId: string      |
    | username: string    |
    | avatarUrl: string   |
    | bio: string         |
    | primarySport: enum  |
    | followers: User[]   |
    | following: User[]   |
    | badges: Badge[]     |
    | ranks: Rank[]       |
    | xp: number          |
    | locationTag: string |
    +---------------------+

2. CONTEXT FLOW
    [Profile Screen] ↔ [UserService] ↔ [User DB]
                             |
                             V
                    [StatSystem, BadgeEngine, RankEngine]

    Pulls dynamic content from:
        MatchStats → player average
        BadgeEngine → badges to display
        XP/Rank → progression visuals

    Can trigger:
        Profile update events
        Community placement (e.g., based on location/sport)

3. SEQUENCE DIAGRAM
    User → ProfileScreen → UserService → DB
    User → EditProfile → UserService.updateProfile()
    → Profile Updated Signal → Feed/Community Refresh

4. SCREEN CONFIGURATION
    - ProfileScreen.tsx
    | Section                | Components                            |
    | ---------------------- | ------------------------------------- |
    | Top Banner             | Avatar, Username, Sport Tag           |
    | Stat Overview          | Matches Played, Wins, XP Bar          |
    | Tabs                   | \[Posts] \[Badges] \[Stats] \[Awards] |
    | Follower Section       | Count + View All + Follow/Unfollow    |
    | Edit Button (UserOnly) | Navigates to `EditProfileScreen`      |


    - EditProfileScreen.tsx
    | Input Field     | Element        |
    | --------------- | -------------- |
    | Username        | TextInput      |
    | Bio             | MultilineInput |
    | Primary Sport   | SportPicker    |
    | Profile Picture | ImageUploader  |
    | Save            | Button         |


5. RELATIONSHIP WITH OTHER FEATURES
    | Connected Feature   | Usage                         |
    | ------------------- | ----------------------------- |
    | Social System       | Enables following/followers   |
    | Match History       | Pulls `UserStats` for summary |
    | Badge & Rank Engine | Display earned achievements   |
    | Community Rooms     | Filters by sport/location tag |

6. CLASSES
    class UserProfile {
        userId: string;
        username: string;
        avatarUrl: string;
        bio: string;
        primarySport: SportType;
        locationTag: string;

        followers: User[];
        following: User[];

        isPublicStats: boolean = true;
        isPublicBadges: boolean = true;
        isPublicPosts: boolean = true;

        badges: Badge[];
        ranks: Rank[];
        xp: number;
    }

    enum SportType {
        Basketball = "Basketball",
        Football = "Football",
        Badminton = "Badminton",
        TableTennis = "TableTennis",
        Volleyball = "Volleyball"
    }

    class BusinessLocation {
        id: string;
        ownerId: string; // UserId
        name: string;
        address: string;
        sport: SportType;
        courtType: "Indoor" | "Outdoor";
        pricing: PricingModel;
        calendar: Booking[];
        verified: boolean;
    }

    - Logic for Access Control
        function getAvailableTabs(user: User): Tab[] {
            switch (user.accountType) {
                case "Regular":
                return ["Feed", "Matches", "Explore", "Profile"];
                case "Competitive":
                return ["Feed", "Matches", "Leaderboards", "Profile"];
                case "Organizer":
                return ["Feed", "Communities", "Events", "Admin", "Profile"];
                case "BusinessOwner":
                return ["Profile", "Locations", "Bookings", "Messages"];
            }
        }

    - Leaderboard Visibility
        function canAppearOnLeaderboard(user: User): boolean {
            return user.accountType === "Competitive" && user.profile.isPublicStats;
        }

    - Match Setup Eligibility
        function canCreateMatch(user: User): boolean {
            return user.accountType === "Competitive" || user.accountType === "Organizer";
        }

        function canCreateTournament(user: User): boolean {
            return user.accountType === "Organizer";
        }

        function canCreateBusinessCourt(user: User): boolean {
            return user.accountType === "BusinessOwner";
        }

    - Badge & XP Assignment Logic
        function canEarnXP(user: User): boolean {
            return user.accountType === "Competitive" || user.accountType === "Regular";
        }

        function canEarnVerifiedBadge(user: User): boolean {
            return user.accountType === "Competitive";
        }

        function canAssignBadges(user: User): boolean {
            return user.accountType === "Organizer" || user.accountType === "BusinessOwner";
        }

    - Social Logic (Follows / MVP Voting)
        function canFollow(target: User): boolean {
            return true;
        }

        function canVoteMVP(viewer: User, target: User): boolean {
            return target.profile.isPublicStats && viewer.accountType !== "BusinessOwner";
        }

    - BusinessOwner-Specific Considerations


## Match Creation

1. CLASS DIAGRAM
    +-------------------+
    |      Match        |
    +-------------------+
    | id: string        |
    | sport: SportType  |
    | type: MatchType   |
    | mode: MatchMode   |
    | date: Date        |
    | locationId: string|
    | createdBy: User   |
    | teams: Team[]     |
    | players: Player[] |
    | rules: MatchRuleSet|
    | stats: MatchStats |
    | status: MatchStatus|
    +-------------------+

    +-----------------------+
    |   MatchSetupSession   |
    +-----------------------+
    | currentStep: number   |
    | selectedSport         |
    | matchType             |
    | matchMode             |
    | location              |
    | teams: Team[]         |
    | rules: MatchRuleSet   |
    | players: Player[]     |
    +-----------------------+

2. CONTEXT FLOW
    [New Match Screen]
        ↓
    [MatchSetupSession]
        ↓        ↘
    [TeamBuilder] [LocationService] → Location DB
        ↓
    [RuleEngine] → SportSettings
        ↓
    [MatchCreator] → Match DB

3. SEQUENCE DIAGRAM
    User → NewMatchScreen → MatchSetupSession.create()
    User → selectSport(), selectMode(), selectType()
    User → selectLocation() → LocationService → Location DB
    User → enterTeams(), addPlayers()
    User → applyRules() → RuleEngine → MatchRuleSet
    User → startMatch() or logMatch() → MatchCreator
    → Match Saved → Update Profile Stats, XP, etc.


4. SCREEN CONFIGURATION
    - NewMatchScreen.tsx
    | Step | Component                             | Notes                                 |
    | ---- | ------------------------------------- | ------------------------------------- |
    | 1    | `SelectSportCard`                     | Icons or sport list                   |
    | 2    | `MatchModePicker` + `MatchTypePicker` | (Single, Set, Tournament, Rotational) |
    | 3    | `LocationSearch` + Date               | Suggest known courts                  |
    | 4    | `TeamEntry` + `PlayerEntry`           | With auto-suggest, regulars           |
    | 5    | `RulesConfigurator`                   | From sport settings                   |
    | 6    | `MatchSummary` + Confirm              | Validate everything                   |

5. RELATIONSHIP WITH OTHER FEATURES
    | Related Feature    | Interaction                           |
    | ------------------ | ------------------------------------- |
    | Stat Tracking      | Affects what fields show during match |
    | Rule Engine        | Pulls `MatchRuleSet` per sport        |
    | Profile System     | Updates XP, matches played            |
    | Location System    | Recommends regulars, logs appearances |
    | Leaderboard Engine | Triggered post-match                  |
    | Badge Engine       | Evaluates performance-based triggers  |

6. CLASSES
    - MATCHES
    class Match {
        id: string;
        sport: SportType;
        type: MatchType; // Single, Set, Tournament, Rotational
        mode: MatchMode; // Casual, Competitive
        date: Date;
        locationId: string;
        createdBy: string; // userId
        teams: Team[];
        players: Player[]; // flattened player list
        rules: MatchRuleSet;
        stats: MatchStats;
        status: MatchStatus; // Scheduled, InProgress, Completed
    }

    - MATCH SETUP SESSION
    Temporary in-memory/session-based representation of an ongoing setup
    class MatchSetupSession {
        sessionId: string;
        userId: string;
        currentStep: number;

        selectedSport: SportType;
        matchType: MatchType;
        matchMode: MatchMode;

        location: Location;
        date: Date;

        teams: Team[];
        players: Player[];
        rules: MatchRuleSet;

        isLive: boolean; // true = live match, false = logging a past match
        autoSaved: boolean;
    }

    - TEAM
    class Team {
        id: string;
        name: string;
        players: Player[];
        jerseyColor?: string;
    }

    - PLAYER SELECTOR
    interface PlayerSelectorOptions {
        sport?: SportType;
        locationId?: string;
        competitiveMode?: boolean;
        teamSize?: number;
    }

    - MATCH STATUS
    enum MatchStatus {
        Draft = "Draft",
        InProgress = "InProgress",
        Completed = "Completed",
        Cancelled = "Cancelled"
    }


7. LOGIC & ENGINE FLOW
    - MATCH CREATION LOGIC
    function createMatch(session: MatchSetupSession): Match {
        if (!validateMatchSetup(session)) throw new Error("Incomplete setup");

        const match = new Match({
            ...session,
            id: generateUUID(),
            status: session.isLive ? "InProgress" : "Completed",
        });

        MatchDB.save(match);
        StatEngine.initialize(match);
        return match;
    }

    - MATCH VALIDATION
    function validateMatchSetup(session: MatchSetupSession): boolean {
        if (!session.selectedSport || !session.matchType || !session.teams.length) return false;
        if (session.matchMode === "Competitive") {
            for (let player of session.players) {
                if (!player.jerseyNo) return false;
            }
        }
        return true;
    }

    - SUGGESTED PLAYER
    function getSuggestedPlayers(locationId: string, sport: SportType): Player[] {
        return PlayerHistoryDB.filter(p =>
            p.locationId === locationId && p.sport === sport && p.matchCount >= 2
        );
    }
    - Auto-Saved Match Draft System
    Let users resume unfinished matches from where they left off.
    class DraftRecoveryService {
        static saveDraft(session: MatchSetupSession): void {
            DraftDB.save({ userId: session.userId, data: session });
        }

        static loadDraft(userId: string): MatchSetupSession | null {
            return DraftDB.findByUser(userId);
        }

        static clearDraft(userId: string): void {
            DraftDB.removeByUser(userId);
        }
    }


   

## Team and Player Management

1. CLASS DIAGRAM
    +--------------+           +-------------+           +--------------+
    |    Team      | --------> |   Player    | <-------- |    User      |
    +--------------+           +-------------+           +--------------+
    | id           |           | id          |           | id           |
    | name         |           | name        |           | email        |
    | color        |           | userId?     |           | profile      |
    | players: []  |           | jerseyNo?   |           | accountType  |
    | matchId?     |           | stats: []   |           |              |
    +--------------+           | matchCount  |           +--------------+
                               | locationMap |
                               +-------------+

2. CONTEXT FLOW
    [Team Entry Screen]
     ↕
    [TeamBuilderEngine]
        ↕
    [PlayerSelectorEngine]
        ↘            ↙
    [LocationDB]   [UserDB]

3. SEQUENCE DIAGRAM
    User → MatchSetup → TeamEntryScreen

    TeamBuilderEngine.createTeam()
    → PlayerSelectorEngine.loadSuggestions()

    User adds player → validate → add to team
    → If competitive: enforce jerseyNo

    Team saved → attached to Match

4. SCREEN CONFIGURATION
    - TeamEntryScreen.tsx
    | Section          | Component                     | Notes                             |
    | ---------------- | ----------------------------- | --------------------------------- |
    | Team Name        | TextInput                     | Optional except in Tournament     |
    | Team Color       | ColorPicker                   | Optional                          |
    | Player Entry     | `PlayerChip` with Add button  | Auto-complete + manual add        |
    | Competitive Mode | Toggle                        | Shows jersey number fields        |
    | Validation       | ErrorBanner                   | Enforces player number, team size |
    | Delete Player    | TrashIcon on each player chip | ✔️                                |

5. RELATIONSHIP WITH OTHER FEATURES
    | Feature                | Interaction                                              |
    | ---------------------- | -------------------------------------------------------- |
    | Match Setup            | Used directly during match creation                      |
    | Stat Tracking          | Pulls `Player` for match-level stats                     |
    | Location System        | Suggests players based on `locationId` + sport           |
    | Competitive Mode Logic | Validates presence of jersey number                      |
    | Player Profile         | Links match stats to user-linked players (if applicable) |

6. CLASSES
    class Team {
        id: string;
        name: string;
        color: string;
        players: Player[];
        matchId?: string;
    }

    class Player {
        id: string;
        name: string;
        userId?: string;        // only if linked to a registered user
        jerseyNo?: number;
        invitedBy?: string;     // userId of who added them
        claimToken?: string;    // used if unregistered
        claimStatus: "Unclaimed" | "Claimed";
        stats: StatSummary;
        matchCount: number;
        locationMap: Record<string, number>; // { locationId: count }
    }

    class UserTeamFavorites {
        userId: string;
        sport: SportType;
        pinnedPlayers: Player[];
    }

    class PinnedPlayer {
        userId: string;
        sport: SportType;
        playerId: string;
    }

    - PlayerChip component
    {
        name: string;
        number?: string; // if competitive
        isSuggested: boolean;
        onRemove(): void;
    }


7. LOGIC & ENGINE FLOW
    - CREATE OR GET PLAYER
        function getOrCreatePlayer(name: string, userId?: string): Player {
            const existing = PlayerDB.findByName(name);
            if (existing) return existing;

            return PlayerDB.create({ name, userId });
        }
    
    - SUGGESTED PLAYER
        function getPlayerSuggestions(userId: string, sport: SportType, locationId: string): Player[] {
            const pinned = PinnedPlayerDB.getPinned(userId, sport);
            const regulars = PlayerDB.getRegularsAt(locationId, sport);
            return mergeAndRankSuggestions(pinned, regulars);
        }

        function mergeAndRankSuggestions(pinned: Player[], regulars: Player[]): Player[] {
            const merged = [...pinned, ...regulars];
            return merged.sort((a, b) => b.matchCount - a.matchCount);
        }

    - COMPETITIVE MODE VALIDATION
        function validateTeamForCompetitive(team: Team): boolean {
            return team.players.every(p => p.jerseyNo && p.jerseyNo.length > 0);
        }

    - ADD PLAYER TO MATCH
    function addPlayerToMatch(name: string, userId?: string): Player {
        if (!userId) {
            const claimToken = generateToken();
            return PlayerDB.create({
            name,
            claimToken,
            invitedBy: currentUser.id,
            claimStatus: "Unclaimed"
            });
        }
        
        return getOrCreatePlayer(name, userId);
    }

    - CLAIM PLAYER
        🔹 Trigger:
        When a registered user logs a player without a linked user account:

        Generate a claim link tied to the player

        Allow user to send invite (via WhatsApp, SMS, etc.)

        const claimLink = `https://athlehub.app/claim/${claimToken}`;
        🔹 Claim Process:
            Invitee opens link

            Chooses sport → Creates account

            Enters optional player name

            System matches the claimToken

            Links all past player stats → upgrades to full User + Player

    - Recommendation Engine Enhancement:
        Return both types:
            if (player.userId || player.claimStatus === "Unclaimed") → eligible for suggestions


## Location System & Regulars
1. CLASS DIAGRAM
    +-------------------+
    |   Location        |
    +-------------------+
    | id: string        |
    | name: string      |
    | address: string   |
    | city: string      |
    | state: string     |
    | country: string   |
    | sport: SportType  |
    | type: LocationType|
    | capacity: number  |
    | coordinates       |
    | amenities: string[]|
    | matchCount: number|
    | verified: boolean |
    | createdBy: User   |
    |playerStats: Map<PlayerId, LocationPlayerRecord>|
    +-------------------+

    +---------------------------+
    | LocationPlayerRecord      |
    +---------------------------+
    | playerId                 |
    | matchCount: number       |
    | firstSeen: Date          |
    | lastSeen: Date           |
    +---------------------------+

2. CONTEXT FLOW
    [LocationSearchField] → [LocationService] ↔ [Location DB]
                                ↓
                        suggestRegularPlayers()

    [AddLocationButton] → [LocationCreator] → Location DB

3. SEQUENCE DIAGRAM
    User → MatchSetupScreen → LocationSearchField
    → LocationService → LocationDB.search(query)
    → results returned → User selects or adds new location
    → if new: open LocationCreator → createLocation()

    → Upon match save:
        → Update LocationPlayerRecord for all players

4. SCREEN CONFIGURATION
    - LocationSearchComponent.tsx
    | Field            | Element Type |
    | ---------------- | ------------ |
    | Search Field     | TextInput    |
    | Result List      | Scroll List  |
    | Add New Location | Pressable    |

    - AddLocationModal.tsx
    | Field          | Type               | Validation                         |
    | -------------- | ------------------ | ---------------------------------- |
    | Name           | TextInput          | Required                           |
    | Address        | TextInput          | Optional                           |
    | City           | Dropdown/TextInput | Optional                           |
    | State          | Dropdown/TextInput | Optional                           |
    | Country        | Dropdown           | Optional                           |
    | Sport          | Select             | Required                           |
    | Location Type  | Select             | Required                           |
    | Capacity       | NumberInput        | Optional                           |
    | Amenities      | MultiSelect/Tags   | Optional                           |
    | Confirm Button | PrimaryButton      | Disabled until required fields set |


5. RELATIONSHIP WITH OTHER FEATURES

| Feature           | Relationship                                      |
| ----------------- | ------------------------------------------------- |
| Match Setup       | Pulls from `Location` + updates it post-match     |
| Player Suggestion | Uses `Location.playerStats` to determine regulars |
| Leaderboard       | Can be scoped by location in future               |
| Communities       | Location can be a basis for rooms or posts        |
| Verification Flow | Admin/organizers verify and tag locations         |

6. CLASSES
    class Location {
        id: string;
        name: string;
        address: string;
        city: string;
        state: string;
        country: string;
        sport: SportType[];
        type: LocationType;
        capacity: number;
        coordinates: GeoPoint;
        amenities: string[];
        matchCount: number;
        verified: boolean;
        createdBy: string; // userId
        playerStats: Map<string, LocationPlayerRecord>;
    }

    class LocationPlayerRecord {
        playerId: string;
        matchCount: number;
        firstSeen: Date;
        lastSeen: Date;
    }

7. LOGIC & ENGINE FLOW

    - LOCATION SEARCH
        function searchLocations(query: string, sport?: SportType): Location[] {
            return LocationDB.search(query, sport);
        }

    - ADD NEW LOCATION
        function createLocation(name: string, sport: SportType[], type: LocationType, capacity: number, amenities: string[], createdBy: string): Location {
            return LocationDB.create({ name, sport, type, capacity, amenities, createdBy });
        }

    -   UPDATE PLAYER MATCH COUNT
        function updateLocationPlayerStats(locationId: string, playerId: string) {
            const location = LocationDB.get(locationId);
            const record = location.playerStats[playerId] || {
                playerId,
                matchCount: 0,
                firstSeen: new Date(),
                lastSeen: new Date()
            };

            record.matchCount += 1;
            record.lastSeen = new Date();

            location.playerStats[playerId] = record;
            LocationDB.update(location);
        }


    - SUGGEST REGULAR PLAYERS
        function suggestRegulars(locationId: string, sport: SportType): Player[] {
            const location = LocationDB.get(locationId);
            return Object.entries(location.playerStats)
                .filter(([_, r]) => r.matchCount >= 1) // Threshold for "regular"
                .map(([playerId]) => PlayerDB.get(playerId))
                .filter(p => p.sport === sport);
        }

    - CREATE LOCATION
        function createLocation(data: {
            name: string;
            address: string;
            city: string;
            state: string;
            country: string;
            sport: SportType;
            type: LocationType;
            capacity?: number;
            coordinates?: GeoPoint;
            amenities?: string[];
            createdBy: string;
            }): Location {
            const location: Location = {
                ...data,
                id: generateUUID(),
                matchCount: 0,
                verified: false,
                playerStats: {}
            };

            return LocationDB.save(location);
        }



## Stat Tracking Engine & Intensity Levels
1. CLASS DIAGRAM
    +--------------------+      +--------------------+
    |    StatEngine      |      |   StatCategory     |
    +--------------------+      +--------------------+
    | calculateStats()   |      | name               |
    |                    |      | description        |
    +--------------------+      | sport: SportType   |
                                | intensity: StatIntensity|
                                | statKeys: StatKey[]|
                                +--------------------+

    +--------------------+      +--------------------+
    |    Match           |<>----|   MatchStats       |
    +--------------------+      +--------------------+
    | id                 |      | matchId            |
    | statIntensity      |      | playerStats: []    |
    | matchType          |      | teamStats: []      |
    | sport              |      | summary: {}        |
    +--------------------+      +--------------------+

    +----------------------+
    | PlayerMatchStat      |
    +----------------------+
    | playerId             |
    | values: Map<StatKey, number>
    +----------------------+

    +----------------------+
    | TeamMatchStat        |
    +----------------------+
    | teamId               |
    | values: Map<StatKey, number>
    +----------------------+

2. CONTEXT FLOW
    User → [MatchStart] → StatEngine.getCategories(sport, intensity)
            ↓
    Returns StatCategory[]
            ↓
    [MatchScreen UI] ← dynamically renders groups + StatKey buttons per category
    User → [MatchEnd] → StatEngine.calculateStats(match, statCategories)
            ↓
    Returns MatchStats
            ↓
    [MatchDB] → saveMatch(match, matchStats)

3. SEQUENCE DIAGRAM

4. SCREEN CONFIGURATION

5. RELATIONSHIP WITH OTHER FEATURES

6. CLASSES

    class StatCategory {
        name: string; // e.g. "Shooting", "Defense"
        description: string;
        sport: SportType;
        intensity: StatIntensity;
        statKeys: StatKey[];
    }


    class StatValidator {
        static getValidationRulesForCategory(category: StatCategory): ValidationRule[] {
            return category.statKeys.map(stat => getRuleFor(stat));
        }
    }

    class StatSchemaEngine {
        static getStatKeys(sport: SportType, intensity: StatIntensity): StatKey[] { /* logic above */ }
    }

    class MatchStats {
        matchId: string;
        playerStats: PlayerMatchStat[];
        teamStats: TeamMatchStat[];
        summary?: any;
    }

    class TeamMatchStat {
        teamId: string;
        values: Map<StatKey, number>;
    }

    class PlayerMatchStat {
        playerId: string;
        values: Map<StatKey, number>;
    }

    class SportRuleSet {
        sport: SportType;
        scoringSystem: ScoringSystem;

        getPointValueFor(stat: StatKey): number {
            switch (this.scoringSystem) {
            case ScoringSystem.Standard:
                if (stat === StatKey.ThreePointFieldGoalsMade) return 3;
                if (stat === StatKey.FieldGoalsMade) return 2;
                break;
            case ScoringSystem.Streetball:
                if (stat === StatKey.ThreePointFieldGoalsMade) return 2;
                if (stat === StatKey.FieldGoalsMade) return 1;
                break;
            }
            if (stat === StatKey.FreeThrowsMade) return 1;
            return 0;
        }
    }




    class UserStatPreference {
        userId: string;
        sport: SportType;
        preferredCategories: StatCategory[];
        autoTrack: boolean;
    }
    > This would allow users or teams to customize which categories are tracked
    >Useful for future training mode, coaching reports, or team-specific stat profiles

7. LOGIC & ENGINE FLOW

    interface MatchScreenStatLayout {
        categories: StatCategory[]; // Each contains statKeys[]
        intensity: StatIntensity;
        liveEntryEnabled: boolean;
        autoCalculate: boolean;
    }

## Badge & Rank System (Gamification Layer)
1. CLASS
    class Badge {
        id: string;
        name: string;              // e.g. "Sharpshooter", "MVP", "100 Club"
        description: string;
        icon: string;              // URL or local asset name
        type: BadgeType;
        sport?: SportType;         // If sport-specific
        accountType?: AccountType; // If restricted to an account category
        requiresVerification: boolean;
        triggerCondition: BadgeCondition;
    }

    interface BadgeCondition {
        statKey?: StatKey;              // e.g. Points, Assists, MatchesPlayed
        matchCount?: number;            // e.g. 50 matches played
        statThreshold?: number;         // e.g. 1000 total points
        rankingTier?: RankingTier;      // Rank-dependent badge
        sport?: SportType;
        accountType?: AccountType;
        locationId?: string;            // For location-specific badges
        timeFrame?: "all-time" | "weekly" | "monthly";
    }

    class UserBadge {
        userId: string;
        badgeId: string;
        dateEarned: Date;
        verified: boolean;
        context: string[]; // Match IDs, Tournament IDs, etc.
    }

    class UserRank {
        userId: string;
        sport: SportType;
        currentTier: RankingTier;
        xp: number;
        level: number;
        rankPoints: number;
    }

    class BadgeEngine {
        static evaluateUserForBadges(userId: string): Badge[] {
            const stats = StatAggregator.getUserStats(userId);
            const matches = MatchHistory.getMatches(userId);
            const eligibleBadges = BadgeDB.getAll();

            return eligibleBadges.filter(badge => {
            const condition = badge.triggerCondition;
            return (
                (!condition.sport || condition.sport === stats.sport) &&
                (!condition.statKey || stats[condition.statKey] >= (condition.statThreshold || 0)) &&
                (!condition.matchCount || matches.length >= condition.matchCount)
            );
            });
        }
    }

    class RankEngine {
        static getUpdatedRank(xp: number): RankingTier {
            if (xp >= 1000) return RankingTier.Legend;
            if (xp >= 700) return RankingTier.Elite;
            if (xp >= 400) return RankingTier.AllStar;
            if (xp >= 200) return RankingTier.Contender;
            return RankingTier.Rookie;
        }

        static calculateXPFromMatch(playerStats: PlayerMatchStat): number {
            // Simple example: 1 XP per point, 3 per assist, etc.
            const pts = playerStats.values[StatKey.Points] || 0;
            const ast = playerStats.values[StatKey.Assists] || 0;
            return pts + ast * 3;
        }
    }

2. UI & FLOW INTEGRATION
    | Section        | Feature                                        |
    | -------------- | ---------------------------------------------- |
    | Profile Screen | Show badges earned, XP progress, current rank  |
    | Match Summary  | Show badge or XP progress from current match   |
    | Leaderboards   | Display users sorted by XP / Rank per sport    |
    | Community Tab  | Highlight top local players by badge or rank   |
    | Share Flow     | Players can share badge unlocks (social boost) |

3. RELATIONSHIP WITH OTHER FEATURES
    | Connected System    | How it interacts                              |
    | ------------------- | --------------------------------------------- |
    | `StatEngine`        | Source of all stat values for evaluations     |
    | `SportRuleSet`      | May affect stat inflation → badge eligibility |
    | `AccountType`       | Can determine badge accessibility             |
    | `PlayerProfile`     | Renders badge list, XP, and rank              |
    | `LeaderboardEngine` | Ranks users based on XP or win ratio          |
    | `Communities`       | Local/community MVP badges or tournaments     |

4. SAMPLE BADGES
    | Name            | Type          | Trigger                       |
    | --------------- | ------------- | ----------------------------- |
    | First Match     | General       | matchCount = 1                |
    | 100 Club        | SportBased    | Points ≥ 100                  |
    | MVP Streak      | AccountBased  | 3 MVPs in a row               |
    | Court Legend    | LocationBased | 20 matches at same location   |
    | Verified Baller | Verified      | Verified by admin, high stats |
    | Referral Champ  | EventBased    | 10 referral signups           |


##  Leaderboards, XP & Performance Engine
1. CLASSES
    class UserXPProfile {
        userId: string;
        sport: SportType;
        xp: number;
        level: number;
        currentTier: RankingTier;
        matchCount: number;
    }

    class PerformanceMetric {
        userId: string;
        sport: SportType;
        winRatio: number;
        avgPoints: number;
        avgAssists?: number;
        efficiencyRating?: number;
        streak?: number;
    }

    class LeaderboardEntry {
        userId: string;
        rank: number;
        xp: number;
        sport: SportType;
        locationId?: string;
        primaryStat: StatKey;
        value: number;
    }

2. LOGIC & ENGINE FLOW
    class XPTrackingEngine {
        static getXPFromStats(playerStats: PlayerMatchStat): number {
            const pts = playerStats.values[StatKey.Points] || 0;
            const ast = playerStats.values[StatKey.Assists] || 0;
            const reb = playerStats.values[StatKey.Rebounds] || 0;
            return pts + (ast * 3) + (reb * 2); // customizable per sport
        }

        static addXP(userId: string, sport: SportType, xp: number): void {
            const profile = XPProfileDB.get(userId, sport);
            profile.xp += xp;
            profile.matchCount += 1;
            profile.level = Math.floor(profile.xp / 100); // e.g. every 100 XP = level up
            profile.currentTier = RankEngine.getUpdatedRank(profile.xp);
            XPProfileDB.save(profile);
        }
    }

    class LeaderboardEngine {
        static generateLeaderboard(
            sport: SportType,
            type: LeaderboardType,
            statKey: StatKey,
            locationId?: string
        ): LeaderboardEntry[] {
            const users = UserDB.getAll();
            const filtered = users.filter(u => u.sport === sport);

            const entries = filtered.map(user => {
            const value = StatAggregator.getStatValue(user.id, statKey, sport, locationId);
            const xp = XPProfileDB.get(user.id, sport)?.xp || 0;
            return {
                userId: user.id,
                rank: 0, // to be sorted later
                xp,
                sport,
                locationId,
                primaryStat: statKey,
                value
            };
            });

            return entries.sort((a, b) => b.value - a.value).map((e, i) => ({ ...e, rank: i + 1 }));
        }
    }

    <!-- class PerformanceEngine {
        static calculateEfficiency(playerStats: PlayerMatchStat): number {
            // Customizable formula per sport
            const pts = playerStats.values[StatKey.Points] || 0;
            const ast = playerStats.values[StatKey.Assists] || 0;
            const reb = playerStats.values[StatKey.Rebounds] || 0;
            return (pts + ast + reb) / (playerStats.matchDuration / 60); // e.g. PPG
        }
    } -->

3. UI & FLOW INTEGRATION
    - Leaderboard Screen
    | Tab               | View                   |
    | ----------------- | ---------------------- |
    | All-Time          | Top performers overall |
    | Sport             | Ranked by sport + stat |
    | Location          | Local legends view     |
    | Friends/Following | Social comparison view |
    | Event/Challenge   | Time-limited rankings  |

    - Profile Screen
    Show:
        Current rank & tier
        XP progress bar
        Top stat rankings
        Leaderboard badges/unlocks

    - Match Summary Screen
    Show:
        XP Gained
        Rank change (if any)
        Badges unlocked
        Streak updates

4. LEADERBOARD TYPES
    | Type           | Scope                                      |
    | -------------- | ------------------------------------------ |
    | Global         | Top across entire platform                 |
    | Sport-Specific | Filtered by selected sport                 |
    | Location-Based | Top players at a specific court or field   |
    | Weekly/Monthly | Reset periodically for freshness           |
    | Custom Event   | Tied to a tournament, badge campaign, etc. |

5. RELATIONSHIP WITH OTHER FEATURES
    | Connected System    | How it interacts                              |
    | ------------------- | --------------------------------------------- |
    | `StatEngine`        | Source of all stat values for evaluations     |
    | `SportRuleSet`      | May affect stat inflation → leaderboard stats |
    | `AccountType`       | Can determine leaderboard accessibility       |
    | `PlayerProfile`     | Renders leaderboard entries and stats         |
    | `BadgeEngine`       | Awards badges based on leaderboard positions  |
    | `Communities`       | Local/community leaderboards and MVP badges   |
    | `UserBadge`     | Triggers based on XP and rank                   |
    | `UserXPProfile` | Powers level & tier mechanics                   |
    | `MatchSummary`  | Reflects XP & leaderboard progress              |
    | `AccountType`   | May influence access to ranking events or tiers |


## Friends, Followers & Social System
1. CLASSES
    class UserConnection {
        id: string;
        sourceUserId: string;
        targetUserId: string;
        connectionType: ConnectionType;
        status: ConnectionStatus;
        createdAt: Date;
    }

2. CONNECTION RULES BY ACCOUNT TYPE
    | Account Type | Can Receive   | Can Send | Social Terms Used | Affects Follower/Following Count |
    | ------------ | ------------- | -------- | ----------------- | -------------------------------- |
    | Player       | Friends, Fans | Friends  | "Friends", "Fans" | ✅ Yes                            |
    | Coach        | Friends, Fans | Friends  | "Friends", "Fans" | ✅ Yes                            |
    | Team         | Supporters    | —        | "Supporters"      | ✅ Yes                            |
    | Business     | Followers     | —        | "Followers"       | ✅ Yes                            |
    | Viewer       | Friends       | Friends  | "Friends"         | ❌ No                             |

3. FAN → FRIEND UPGRADE FLOW
    | Step | Action                                                       |
    | ---- | ------------------------------------------------------------ |
    | 1    | User becomes a **fan** of a Player or Coach                  |
    | 2    | Sends a **friend request** (optional)                        |
    | 3    | Player or Coach **accepts** → connection becomes **Friend**  |
    | 4    | Old Fan record is archived or upgraded                       |
    | 5    | Friend-specific access (e.g. tagging, messaging) is unlocked |

4. CLASS DIAGRAM
    [User] ←1----n→ [UserConnection] ←n----1→ [User]

            ↑
            |
        FanEntry
            |
            └─→ [Team] / [Player] / [Coach] / [Location]

    AccountType logic filters:
    - Determines what connection types are allowed
    - Defines default privacy and visibility settings

5. 
    | Count Type    | Includes                                            |
    | ------------- | --------------------------------------------------- |
    | **Followers** | Fans, Supporters, Followers (based on account type) |
    | **Friends**   | Mutual, accepted connections only                   |


6. FUNCTIONAL IMPACT AREAS
    | System/Screen       | Description                                               |
    | ------------------- | --------------------------------------------------------- |
    | **Profile Page**    | Shows fans, friends, supporters, followers                |
    | **Match Setup**     | Friend-based player recommendations                       |
    | **Feed Filter**     | Followed/friends content                                  |
    | **Badge System**    | Earn badges from social actions (Top Supporter, Superfan) |
    | **Leaderboards**    | Sort friends/fans/supporters for private rankings         |
    | **Notifications**   | Alerts when followed user posts/plays                     |
    | **Referral System** | Count referrals through fans or supporter invites         |

## Content Feed – Posts, Highlights, & Activity
1. CLASSES
    class Post {
        id: string;
        authorId: string;
        content: string;
        type: PostType;
        media: MediaAttachment[];
        visibility: PostVisibility;
        createdAt: Date;
        associatedMatchId?: string;
        associatedBadgeId?: string;
        Comments: Comment[];
        reactions: Reaction[];
        likes: Like[];
        replyThreadId?: string; // If this post is a reply to another post
    }


    class Comment {
        id: string;
        postId: string;
        authorId: string;
        content: string;
        createdAt: Date;
        reactions: Reaction[];
        likes: Like[];
    }

    class Like {
        id: string;
    }

    class Reaction {
        id: string;
        postId: string;
        authorId: string;
        type: ReactionType;
        createdAt: Date;
    }

    class MediaAttachment {
        id: string;
        postId: string;
        type: MediaType;
        url: string;
        uploadedBy: string;
        timestamp?: Date;        // Optional: for match moment sync
        isFeatured?: boolean;
    }

    class Poll {
        postId: string;
        question: string;
        options: PollOption[];
        endsAt: Date;
    }

        class PollOption {
        text: string;
        votes: string[]; // array of userIds
    }

2. CONTEXT FLOW
    [User] → [CreatePostScreen] → [PostService] → [PostDB]
            ↓
    [FeedScreen] → [FeedService] → [PostDB]
            ↓
    [CommentScreen] → [CommentService] → [CommentDB]
            ↓
    [ReactionScreen] → [ReactionService] → [ReactionDB]
            ↓
    [LikeScreen] → [LikeService] → [LikeDB]

3. SEQUENCE DIAGRAM
    User → CreatePostScreen → PostService.createPost()
    → PostDB.save(post)

    User → FeedScreen → FeedService.getFeed()
    → PostDB.fetchPosts() → posts returned

    User → CommentScreen → CommentService.addComment()
    → CommentDB.save(comment)

    User → ReactionScreen → ReactionService.addReaction()
    → ReactionDB.save(reaction)

    User → LikeScreen → LikeService.addLike()
    → LikeDB.save(like)

4. SCREEN CONFIGURATION
    | Screen                 | Features                                   |
    | ---------------------- | ------------------------------------------ |
    | **Main Feed**          | Scrollable timeline of mixed post types    |
    | **New Post Modal**     | Text, photo/video, visibility, poll option |
    | **Post Detail**        | View post → reactions → replies thread     |
    | **Poll UI**            | Vote, view results, countdown if timed     |
    | **Match Preview Card** | When a match is linked in a post           |
    | **Comment View**       | Show threaded replies                      |
    | **Repost/Share**       | With or without caption                    |

5. FEED FILTER OPTIONS
    | Filter Option   | Description                                  |
    | --------------- | -------------------------------------------- |
    | Sport Feed      | Posts related to basketball, football, etc.  |
    | Friends Feed    | Posts from mutual connections                |
    | Following Feed  | Posts from followed users, teams, businesses |
    | Match-Only Feed | Show only posts with match links/stats       |
    | Location Feed   | Posts tied to a specific court/field         |
    | Trending        | Based on reactions, comments, reposts        |

6. RELATIONSHIP WITH OTHER FEATURES
    | System              | How it Connects                              |
    | ------------------- | -------------------------------------------- |
    | `UserProfile`       | Posts tab shows user’s activity & media      |
    | `MatchHistory`      | Highlights & stats can be posted directly    |
    | `BadgeSystem`       | Unlock triggers celebratory post             |
    | `LeaderboardEngine` | Rank climbs can appear as achievements       |
    | `CommunityRooms`    | Popular posts can be cross-featured in rooms |
    | `Location`          | Posts can be tagged to courts/fields         |

    | Connected To        | Purpose                                           |
    | ------------------- | ------------------------------------------------- |
    | `StatEngine`        | Automatically generate clips/stat posts           |
    | `BadgeSystem`       | Unlock media-based badges (e.g. “Top Highlights”) |
    | `MatchSystem`       | Tag content directly to match summaries           |
    | `LocationSystem`    | Tag courts in videos/pics                         |
    | `LeaderboardEngine` | Show top player content with stats                |
    | `CommunityRoom`     | Share pinned post in court chats                  |


7. MEDIA UPLOAD SYSTEM
    | Feature                      | Description                                             |
    | ---------------------------- | ------------------------------------------------------- |
    | **Image Upload**             | Upload player photos, team images, event flyers         |
    | **Video Upload**             | Game clips, highlight reels, interviews                 |
    | **Multi-Media Support**      | Up to 5 media files per post                            |
    | **Supported Formats**        | JPG, PNG, MP4, MOV                                      |
    | **Compression/Optimization** | Auto resize for feed performance                        |
    | **Match-Based Upload**       | Attach clips to specific plays/moments (future upgrade) |



8. PINNING & FEATURED CONTENT
    | Type                         | Where It Appears                                |
    | ---------------------------- | ----------------------------------------------- |
    | **Pinned Posts**             | Top of User Profile / Team Page / Location Feed |
    | **Featured Match Highlight** | Match Summary screen or Feed                    |
    | **Featured Player Media**    | In Sport Leaderboard or Profile Showcase        |
    | **Pinned Room Message**      | Cross-posted content to Community Room          |

9. HASHTAGS & TAGGING
    | Tag Type             | Action                   |
    | -------------------- | ------------------------ |
    | **@PlayerName**      | Link to user profile     |
    | **#CourtName**       | Link to location page    |
    | **#Basketball**      | Show trending sport feed |
    | **@TeamName**        | Link to team account     |
    | **#AthlehubMoments** | Hashtag challenge post   |

    > Tagging is enabled in captions and comments. Clickable previews auto-generate on tag use.

10. TRENDING LOGIC
    | Metric                    | Weight        |
    | ------------------------- | ------------- |
    | Reactions per Hour        | 🔥 High       |
    | Reposts                   | 🔁 Medium     |
    | Comments per Post         | 💬 High       |
    | Shares to Community Rooms | 🧵 Medium     |
    | Hashtag Challenge Usage   | 🎯 High       |
    | Verified Accounts Posted  | ✅ Bonus Boost |

    > Trending algorithm is a blend of immediate reactions and long-term engagement. Verified accounts and hashtag challenges receive a bonus multiplier.
    Trending Algorithm Pseudo
    function calculateTrendingScore(post: Post): number {
        return (
            (post.reactions.length * 2) +
            (getCommentCount(post.id) * 3) +
            (getRepostCount(post.id) * 1.5) +
            (isFromVerified(post.authorId) ? 5 : 0)
        );
    }

## In App Messaging & Team Chat
1. CLASSES
    class MessageThread {
        id: string;
        participantIds: string[];  // Users in the thread
        type: MessageThreadType;
        createdAt: Date;
        name?: string; // For group/team threads
    }

    class Message {
        id: string;
        threadId: string;
        senderId: string;
        content: string;
        type: MessageType;
        timestamp: Date;
        isEdited?: boolean;
        editedAt?: Date;
        readBy: string[]; // userIds who have read
    }

    class ChatRoom {
        id: string;
        name: string;
        description: string;
        ownerId: string;
        members: string[];  // User IDs
        isPublic: boolean;
        createdAt: Date;
    }

    class ChatMessage {
        id: string;
        roomId: string;
        authorId: string;
        content: string;
        createdAt: Date;
        isEdited?: boolean;
        editedAt?: Date;
    }

2. CONTEXT FLOW
    [MessageScreen] → [MessageService] ↔ [MessageDB]
                             |
                             V
                    [ChatRoomService] ↔ [ChatRoomDB]
                             |
                             V
                    [ChatMessageService] ↔ [ChatMessageDB]

3. SEQUENCE DIAGRAM
    User → MessageScreen → MessageService → MessageDB
    User → SendMessage() → MessageDB.save(message)
    User → ReadMessage() → MessageDB.markRead(messageId, userId)
    User → ChatRoomScreen → ChatRoomService → ChatRoomDB
    User → CreateChatRoom() → ChatRoomService.createRoom()
    User → SendMessageToChat() → ChatMessageService → ChatMessageDB
    User → EditMessage() → ChatMessageService.editMessage()

4. Privacy Controls
    | Control Option         | Availability                               |
    | ---------------------- | ------------------------------------------ |
    | Block/Report user      | ✅ Yes                                      |
    | Leave Group            | ✅ Yes                                      |
    | Mute Notifications     | ✅ Yes                                      |
    | Pin Threads            | ✅ Yes                                      |
    | Archive Inactive Chats | ✅ Auto after 30 days (can be re-activated) |

5. CHAT CONTROLS
    | Feature                | Availability                               |
    | ---------------------- | ------------------------------------------ |
    | **Message Editing**    | ✅ Yes, within 5 minutes of sending       |
    | **Message Deletion**   | ✅ Yes, by sender within 24 hours         |
    | **Thread Management**  | ✅ Yes, pin, archive, mute, leave         |

6. UI TOUCHPOINTS
    | Screen/Component       | Purpose                                    |
    | ---------------------- | ------------------------------------------ |
    | **Message Thread**     | Direct messages, group chats, team chats   |
    | **Chat Room**          | Public or private group discussions        |
    | **Notification Bell**  | Badge for unread messages                  |
    | **Message Bell**       | Badge for unread messages in threads       |
    | **Profile Screen**     | Show recent messages with users            |
    | **Community Rooms**    | Show pinned messages from chat rooms       |
    | **Match Summary**      | Show pinned messages from match threads    |


    | Screen                    | Function                                     |
    | ------------------------- | -------------------------------------------- |
    | **Messages Tab**          | Inbox with filter: All, Team, Groups, Direct |
    | **Match Setup Screen**    | “Share in Chat” button (for setup summary)   |
    | **Team Page**             | Internal team chat (private)                 |
    | **Player Profile**        | “Message” button (if not blocked)            |
    | **Referral Notification** | Opens message thread with referral details   |

7. CONNECTED FEATURES
    | Feature/System   | Integration                                         |
    | ---------------- | --------------------------------------------------- |
    | `TeamAccount`    | Team chat thread auto-created                       |
    | `ReferralEngine` | Uses messaging to verify stat claims                |
    | `MatchEngine`    | Setup summary + result can be shared in chat        |
    | `BadgeSystem`    | Social badges tied to chat behavior (“Team Talker”) |
    | `StatEngine`     | Stat claims generate message threads                |
    | `UserBlockList`  | Used to restrict or mute messages                   |
    | `NotificationSystem` | Used to alert users of new messages              |

## Multi-Account Match Recording
1. CLASSES
    class CollaborativeMatchSession {
        id: string;
        matchId: string;
        sessionCode: string;  // Shareable code or link
        createdBy: string;    // UserId of host
        status: MatchRecordingStatus;
        accessType: MatchAccessType;
        participantIds: string[];
        roles: Record<string, MatchUserRole>; // userId → role
        createdAt: Date; // When session was created in cases of scheduled matches
        startedAt: Date;
        endedAt?: Date;
    }

    class MatchRecordingStatus {
        id: string;
        matchRecordingSessionId: string;
        userId: string;
        timestamp: Date;
        action: MatchRecordingAction;
    }

2. CONTEXT FLOW
    User A → Creates Match (Host)
    ↓
    Generates Session Code or invites User B, C, D
    ↓
    User B joins as Recorder, User C as Coach
    ↓
    All log stats based on assigned roles
    ↓
    Match ends → All data synced
    ↓
    Validator (if needed) reviews entries for accuracy
    ↓
    Final stats submitted

3. ACCESS & SECURITY
    | Control Area        | Notes                                                            |
    | ------------------- | ---------------------------------------------------------------- |
    | Session Codes       | 6-digit or sharable invite link                                  |
    | Host Approval Flow  | Required for InviteOnly                                          |
    | Role Permissions    | Recorder can only touch stats; Viewer is read-only               |
    | Conflict Resolution | If two recorders log different stats, Host or Validator resolves |

4. UI INTEGRATION
    | Screen              | Function                                     |
    | ------------------- | -------------------------------------------- |
    | **Match Setup**     | “Enable Multi-Account Recording” toggle      |
    | **Share Screen**    | Invite via code or contacts                  |
    | **Match Screen**    | Highlight user avatars logging live          |
    | **End Match Modal** | Submit → Validator Review (if enabled)       |
    | **Match History**   | “Recorded by: X, Y, Z” + edit history button |

5. CONNECTED FEATURES
    | System           | Use Case                                             |
    | ---------------- | ---------------------------------------------------- |
    | `StatEngine`     | Allows logging from multiple accounts                |
    | `UserAccount`    | Permissions & role restrictions                      |
    | `MatchValidator` | Handles conflict resolution logic                    |
    | `ReferralSystem` | Optional: invite = referral stat credit              |
    | `BadgeSystem`    | “Team Scorer” or “Collaborative Match” badge unlocks |

6. VALIDATION OPTIONS
    | Validation Option | Description                                           |
    | ----------------- | ----------------------------------------------------- |
    | **No Validator**  | Host automatically approves all stats                 |
    | **Host Validates**| Host reviews and approves stats from all recorders    |
    | **Recorder Validates**| Each recorder approves stats from others          |
    | **External Validator**| Third-party validation service or trusted referee |

    | Method                | Description                                         |
    | --------------------- | --------------------------------------------------- |
    | Post-Match Review     | Validator compares entries across users             |
    | Auto-Flagging         | Conflicting entries are flagged for host            |
    | Trusted Logger System | Frequent accurate scorers earn auto-approval status |

## Progression & Leveling System
1. CLASSES
    class ProgressionProfile {
        userId: string;
        sportProgress: Map<SportType, SportProgress>;
        locationRanks: LocationRankEntry[];
        teamRankHistory: TeamRankEntry[];
        globalXP: number;
        currentLevel: number;
        nextLevelXP: number;
    }

    class SportProgress {
        sport: SportType;
        xp: number;
        level: number;
        matchCount: number;
        rankTitle: SportRankTitle;
    }

    class LocationRankEntry {
        locationId: string;
        rank: LocationRankTitle;
        matchCount: number;
        sport: SportType;
        xp: number;
        topStatCategories: StatKey[];
    }
...
    class TeamRankEntry {
        teamId: string;
        joinedDate: Date;
        contributionXP: number;
        role: TeamRole;
        previousRanks: TeamRankTitle[];
    }
...

2. CONTEXT FLOW
    [MatchEnd] → [XPTrackingEngine] → [ProgressionDB]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [RankEngine] → [RankDB]
            ↓
    [ProfileScreen] ← [ProgressionDB, BadgeDB, RankDB]

3. LEVEL & RANKING STRUCTURE
    - Global XP & Level
        | Level | XP Required  | Perks                               |
        | ----- | ------------ | ----------------------------------- |
        | 1–10  | 100 XP/level |      |
        | 11–20 | 250 XP/level |      |
        | 21–30 | 500 XP/level |      |
        | 31+   | Scaling XP   |      |
    - 
    - Sport Ranks
        - Based on match count and XP in a specific sport
    - Location Ranks
        - Based on match count and XP in a specific location

4. XP SOURCES & CALCULATION

    > XP is capped per match to avoid farming.
    | XP Source         | Amount                                       |
    | ----------------- | -------------------------------------------- |
    | Match Win         | 10 XP + 1 XP per goal/ 0.25 xp per point     |
    | Match Loss        | 5 XP                                         |
    | MVP in Match      | 20 XP + 5 XP per point differential          |
    | Logging advanced stats        | 20 XP      |
    | Winning a match               | 15 XP      |
    | Earning a badge               | 25 XP      |
    | Tagged by others in a match   | 10 XP      |
    | Getting MVP in match          | 50 XP      |
    | Match played at new location  | 5  XP      |
    | Verified fan/supporter joined | 15 XP      |
    | Referring a new user          | 25 XP      |
    | Completing a tournament       | 50 XP      |
    | Completing a challenge        | 25 XP      |
    | Completing a streak           | 10 XP      |
    | Completing a daily goal       | 10 XP      |
    | Completing a weekly goal      | 25 XP      |
    | Completing a monthly goal     | 50 XP      |
    | Completing a yearly goal      | 100 XP     |
    | Completing a custom goal      | 50 XP      |



5. BADGE TRIGGERING
    | Badge Name        | Trigger Condition                            |
    | ----------------- | -------------------------------------------- |
    | First Match       | matchCount = 1                               |
    | 10 Matches        | matchCount = 10                              |
    | 50 Matches        | matchCount = 50                              |
    | 100 Matches       | matchCount = 100                             |
    | First Win         | winCount = 1                                 |
    | Winning Streak    | winningStreak = 5                            |
    | Tournament Winner | tournamentCount = 1                          |
    | MVP               | mvpCount = 1                                 |
    | MVP Streak        | mvpStreak = 3                                |
    | Referral Champ    | referredSignups = 10                         |
    | Court Legend      | matchCountAtLocation = 20                    |
    
5. CONNECTED SYSTEMS
    | Feature          | Integration                             |
    | ---------------- | --------------------------------------- |
    | `BadgeSystem`    | Badge unlock triggers XP                |
    | `StatEngine`     | XP based on stat depth and role         |
    | `TeamAccount`    | Team tier rises as XP is accumulated    |
    | `LocationSystem` | Track player contributions to locations |
    | `MatchHistory`   | Displays level, XP, rank progression    |

6. UI INTEGRATION
    | Screen        | Elements                                |
    | ------------- | --------------------------------------- |
    | Profile Page  | Level bar, title badges, location ranks |
    | Match Summary | XP earned, level progress               |
    | Leaderboards  | Sort by level, title, or XP             |
    | Location Page | “Top Legends Here” + Rank distribution  |
    | Team Page     | Player roles + rank + XP contribution   |

7. UNLOCKABLES & INCENTIVES
    | Unlockable        | Requirement                             |
    | ----------------- | --------------------------------------- |
    | Title Badges      | Reach certain levels or XP thresholds   |
    | Exclusive Gear    | Partner with sponsors for tiered rewards |
    | Early Access      | Gain access to new features first       |
    | Special Events    | Invitations to exclusive tournaments    |
    | Priority Support  | Faster response times from customer care |

## Reward System — Badges, Leaderboards & Challenges
1. CLASSES
    class Badge {
        id: string;
        name: string;
        description: string;
        icon: string;
        category: BadgeCategory;
        rarity: BadgeRarity;
        claimType: BadgeTrigger;
        criteria: BadgeCriteria;
        dateEarned?: Date;
        isPinned?: boolean;
        isHidden?: boolean;
    }


    interface BadgeCondition {
        statKey?: StatKey;
        matchCount?: number;
        statThreshold?: number;
        rankingTier?: RankingTier;
        sport?: SportType;
        accountType?: AccountType;
        minValue?: number;
        locationId?: string;
        requiresVerification?: boolean;
        timeFrame?: "all-time" | "weekly" | "monthly";
    }

    interface BadgeCriteria {
        statKey?: StatKey;                  // e.g. Points, Assists, Rebounds
        minValue?: number;                  // Minimum value required for the stat
        matchCount?: number;                // Number of matches played/logged
        winCount?: number;                  // Number of wins required 
        sport?: SportType;                  // Badge applies only to a specific sport
        isLocationSpecific?: boolean;       // True if it applies to a single court
        locationId?: string;                // Specific court or field ID (optional)
        streakLength?: number;              // Used for match streaks
        requiresVerification?: boolean;     // Stat/match must be verified to count
        leaderboardRank?: number;           // Must hit X rank in leaderboard
        referralCount?: number;             // Number of referrals needed
        friendCount?: number;               // Number of friends connected
        followerCount?: number;             // Number of followers gained
        teamId?: string;                    // Tied to specific team contribution
        postEngagement?: number;            // Likes/comments required for content badges
        challengeId?: string;               // Badge tied to specific challenge
    }

    class UserBadge {
        userId: string;
        badgeId: string;
        dateEarned: Date;
        verified: boolean;
        context: string[]; // Match IDs, Tournament IDs, etc.
    }

    class Challenge {
        id: string;
        title: string;
        type: ChallengeType;
        targetStat: StatKey;
        goal: number;
        duration: ChallengeDuration;
        rewardBadgeId: string;
        participants: string[]; // userIds
        startDate: Date;
        endDate: Date;
    }


    class LeaderboardEntry {
    id: string;
    type: LeaderboardType;
    targetId?: string; // sport, location, or team
    entries: RankedUserStat[];
    }

    class UserBadgeDisplaySettings {
        userId: string;
        pinnedBadges: string[];  // max of 3 badge IDs
        hiddenBadges: string[];  // badge IDs hidden from public
        sortPreference: BadgeSortMode;
    }


2. CONTEXT FLOW
    [MatchEnd] → [XPTrackingEngine] → [ProgressionDB]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [RankEngine] → [RankDB]
            ↓
    [ProfileScreen] ← [ProgressionDB, BadgeDB, RankDB]

    [ChallengeCompletion] → [ChallengeEngine] → [BadgeEngine]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [ProfileScreen] ← [BadgeDB]

3. BADGE CATEGORIES LISTS
    GENERAL BADGES
    | Badge            | Rarity   | ClaimType | Trigger                      |
    | ---------------- | -------- | --------- | ---------------------------- |
    | FirstMatch       | Common   | Auto      | 1 match played               |
    | FirstWin         | Common   | Auto      | First win recorded           |
    | 10MatchesPlayed  | Uncommon | Auto      | 10 matches played            |
    | 100MatchesPlayed | Rare     | Auto      | 100 matches played           |
    | 10Wins           | Uncommon | Auto      | 10 match wins                |
    | Streak3          | Uncommon | Auto      | 3 match streak               |
    | Streak7          | Rare     | Auto      | 7 match streak               |
    | MatchLogger      | Common   | Auto      | Logs 5 matches manually      |
    | ConsistencyKing  | Rare     | Auto      | Plays every week for 1 month |
    | MVPFirstTime     | Uncommon | Auto      | First MVP                    |
    | MVP10Times       | Rare     | Auto      | 10 MVP titles                |

    ACCOUNT BADGES
    | Badge            | Rarity       | ClaimType    | Trigger                      |
    | ---------------- | ------------ | ------------ | ---------------------------- |
    | CoachCertified   | VerifiedOnly | VerifiedOnly | Coach identity verified      |
    | BusinessVerified | VerifiedOnly | VerifiedOnly | Business docs submitted      |
    | TeamVerified     | VerifiedOnly | VerifiedOnly | Official team status granted |
    | Recruiter        | Uncommon     | Auto         | Invites 3 users who join     |
    | ReferralStarter  | Rare         | Auto         | Invites 10 players           |
    | ReferralLeader   | Epic         | Auto         | 50+ referrals                |
    | PopularUser      | Rare         | Auto         | 100+ followers               |


    SOCIAL BADGES
    | Badge           | Rarity   | ClaimType    | Trigger                        |
    | --------------- | -------- | ------------ | ------------------------------ |
    | FriendMaker     | Common   | Auto         | Adds 5 friends                 |
    | SuperFan        | Uncommon | Auto         | Follows 5 players, joins chats |
    | TeamCaptain     | Epic     | VerifiedOnly | Leads a verified team          |
    | SocialButterfly | Rare     | Auto         | Interacts on 10 posts or rooms |
    | CommunityVoice  | Rare     | Auto         | Top replies in 3 rooms         |
    | PostChampion    | Rare     | Auto         | 100+ likes across posts        |
    | Commentator     | Rare     | Auto         | 100+ comments across posts     |
    | PollMaster      | Rare     | Auto         | 10+ polls created              |
    | Trendsetter     | Rare     | Auto         | 10+ posts with high reactions  |
    | HashtagChampion | Rare     | Auto         | 10+ posts with specific tag    |


    LOCATION BADGES
    | Badge               | Rarity       | ClaimType    | Trigger                                |
    | ------------------- | ------------ | ------------ | -------------------------------------- |
    | FirstTimeAtLocation | Common       | Auto         | First match at location                |
    | CourtRegular        | Uncommon     | Auto         | 5 matches at same location             |
    | LocalHero           | Rare         | Auto         | 15 matches + MVP at location           |
    | CourtBoss           | Epic         | Auto         | 25+ matches, top 3 stat holder         |
    | CourtLegend         | Legendary    | Auto         | 50+ matches, top 3 MVPs                |
    | MostMatchesAtCourt  | VerifiedOnly | VerifiedOnly | Highest match count (live leaderboard) |
    | MostMVPsAtCourt     | VerifiedOnly | VerifiedOnly | Highest MVP count (live leaderboard)   |



    SPORT(BASKETBALL) BADGES
    | Badge            | Rarity    | ClaimType    | Trigger                                  |
    | ---------------- | --------- | ------------ | ---------------------------------------- |
    | First3Pointer    | Common    | Auto         | Logs first 3PT stat                      |
    | TripleDouble     | Epic      | VerifiedOnly | Verified stat record with 10+ in 3 stats |
    | 50PointGame      | Legendary | VerifiedOnly | Logs 50+ points in one game              |
    | BlockMaster      | Rare      | Auto         | 5+ blocks in 3 matches                   |
    | AssistKing       | Rare      | Auto         | Logs 20 assists total                    |
    | FreeThrowPerfect | Rare      | Auto         | 100% FT in a full game with over 3 FTs   |
    | StealMachine     | Rare      | Auto         | 5+ steals in 3 matches                   |

    SPORT(FOOTBALL) BADGES 
    | Badge            | Rarity    | ClaimType    | Trigger                                  |
    | ---------------- | --------- | ------------ | ---------------------------------------- |
    | FirstGoal        | Common    | Auto         | Logs first goal stat                     |
    | GoalScorer10Times| Uncommon  | Auto         | Logs 10 goals total                      |
    | GoalScorer50Times| Rare      | Auto         | Logs 50 goals total                      |
    | GoalScorer100Times| Epic      | Auto         | Logs 100 goals total                     |
    | GoalScorerStreak3 | Uncommon  | Auto         | 3 match streak                           |
    | GoalScorerStreak7 | Rare      | Auto         | 7 match streak                           |
    | AssistMaster     | Rare      | Auto         | Logs 20 assists total                    |

    SPORT(BADMINTON) BADGES
    | Badge            | Rarity    | ClaimType    | Trigger                                  |
    | ---------------- | --------- | ------------ | ---------------------------------------- |
    | FirstAce         | Common    | Auto         | Logs first ace stat                      |
    | AceMaster        | Rare      | Auto         | Logs 20 aces total                       |
    | AceStreak3       | Uncommon  | Auto         | 3 match streak                           |
    | AceStreak7       | Rare      | Auto         | 7 match streak                           |

    SPORT(TABLE TENNIS) BADGES
    | Badge            | Rarity    | ClaimType    | Trigger                                  |
    | ---------------- | --------- | ------------ | ---------------------------------------- |
    | FirstWin         | Common    | Auto         | Logs first win stat                      |
    | WinMaster        | Rare      | Auto         | Logs 20 wins total                       |
    | WinStreak3       | Uncommon  | Auto         | 3 match streak                           |
    | WinStreak7       | Rare      | Auto         | 7 match streak                           |

    SPORT(VOLLEYBALL) BADGES
    | Badge            | Rarity    | ClaimType    | Trigger                                  |
    | ---------------- | --------- | ------------ | ---------------------------------------- |
    | FirstPoint       | Common    | Auto         | Logs first point stat                    |
    | PointMaster      | Rare      | Auto         | Logs 20 points total                     |
    | PointStreak3     | Uncommon  | Auto         | 3 match streak                           |
    | PointStreak7     | Rare      | Auto         | 7 match streak                           |

4. PINNING RULES 
    - Badges can be pinned to the profile
    - Max of 3 badges can be pinned
    - Badges can be reordered
    - Badges can be unpinned
    - Badges can be hidden from public view
    - Badges can be shown in a specific order
    - Badges can be shown in a specific category order

    | Rule                    | Value                                                    |
    | ----------------------- | -------------------------------------------------------- |
    | Max pinned badges       | 3                                                        |
    | Pinned badge appears in | User profile, Match summary, Leaderboards, Feed mentions |
    | Reorder method          | Drag-and-drop or selection UI                            |
    | Validation              | Cannot pin locked/unearned badges                        |

5. DISPLAY BEHAVIOR
    | Context                 | Display                                           |
    | ----------------------- | ------------------------------------------------- |
    | **User Profile**        | Full badge wall + pin edit controls               |
    | **Match Summary**       | Show most recently earned or relevant sport badge |
    | **Leaderboard Row**     | Top pinned badge or most rare unlocked            |
    | **Feed/Highlight Post** | Badge earned shown with stats/media               |
    | **Community Rooms**     | Hover or tap user to see badge hover-card         |

6. FILTER FOR BADGE WALL
    | Filter Option         | Notes                                      |
    | --------------------- | ------------------------------------------ |
    | All / Earned / Locked | See badge progress or earned               |
    | Category              | Filter by sport, challenge, location, etc. |
    | Rarity                | Common → Legendary                         |
    | Search                | Badge name keyword                         |

7. UI FLOW
    - Badge Wall UI (User Profile)
        - Grid layout (3 per row)
        - Rarity color-coded borders
        - Pinned badges have 🔱 icon
        - Locked badges have grayscale + tooltip

    - Pin Badge Modal
        - Shows all earned badges
        - Allows drag or “Pin 1/3” selection
        - Replaces older pinned if over limit

8. CONNECTED SYSTEMS
    | System              | Purpose                                      |
    | ------------------- | -------------------------------------------- |
    | `ProfileSystem`     | Manages display settings, privacy toggles    |
    | `BadgeSystem`       | Sends earned badges to UI with display state |
    | `FeedSystem`        | Badges included in auto-posts                |
    | `LeaderboardEngine` | Chooses top badge for visibility in rows     |
    | `ChallengeEngine`   | Highlights badges tied to active goals       |

## Referral, Stat Claim & Verified Profile System
1. CLASSES
    class ReferralInvite {
        id: string;
        senderId: string;
        recipientEmail?: string;
        matchId?: string;
        tempPlayerId?: string;
        code: string;
        status: ReferralStatus;
        createdAt: Date;
        claimedBy?: string;
        claimedAt?: Date;
    }

    class StatClaimRequest {
        id: string;
        matchId: string;
        tempPlayerId: string;
        userId: string;
        verifiedByHost: boolean;
        status: ClaimStatus;
        submittedAt: Date;
    }

    class VerificationRequest {
        id: string;
        userId: string;
        type: VerificationType;
        documents: File[];
        reason: string;
        status: VerificationStatus;
        reviewedBy?: string;
        submittedAt: Date;
    }

2. REFERRAL SYSTEM FLOW
    [User] → [ReferralInvite] → [ReferralDB]
            ↓
    [NotificationSystem] → [User]
            ↓
    [User] → [Accept/Decline] → [ReferralDB]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [XPTrackingEngine] → [ProgressionDB]
            ↓
    [ProfileScreen] ← [ProgressionDB, BadgeDB]

    | Action                  | Triggered                                   |
    | ----------------------- | ------------------------------------------- |
    | Referral Invite Created | User generates link or shares match         |
    | User Registers via Link | New account auto-links to referrer          |
    | Bonus Earned            | When referral plays a match or hits XP goal |
    | Referral Champ Badge    | When user hits 10 referrals                  |
    | Match Claim Suggested   | Referral claims their match stats           |
    | Match Claim Approved    | Host verifies the claim                     |
    | Bonus Earned            | When claim is approved                      |

3. STAT CLAIM FLOW
    [User] → [StatClaimRequest] → [StatClaimDB]
            ↓
    [NotificationSystem] → [User]
            ↓
    [User] → [Accept/Decline] → [StatClaimDB]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [XPTrackingEngine] → [ProgressionDB]
            ↓
    [ProfileScreen] ← [ProgressionDB, BadgeDB]

    - When a match contains unregistered players (temp player names), the host can send stat claim links via:
        - Email or message
        - In-app share button
        - QR code at match end (future enhancement)

    - On clicking the link:
        - New user registers → stat record is linked
        - If already registered, they confirm claim
        - Host or validator can approve/reject

4. VERIFICATION FLOW
    [User] → [VerificationRequest] → [VerificationDB]
            ↓
    [NotificationSystem] → [Admin]
            ↓
    [Admin] → [Approve/Reject] → [VerificationDB]
            ↓
    [BadgeEngine] → [BadgeDB]
            ↓
    [XPTrackingEngine] → [ProgressionDB]
            ↓
    [ProfileScreen] ← [ProgressionDB, BadgeDB]

    | Account Type   | Can be Verified | Required For                       |
    | -------------- | --------------- | ---------------------------------- |
    | Player         | ✅              | High-level play, league entry      |      
    | Coach          | ✅              | Roster management, stat validation |  
    | Team           | ✅              | Tournament eligibility, branding   |   
    | Business       | ✅              | Event hosting, court ownership     |
    | Location Owner | ✅              | Official listing and moderation    |

    - User applies and uploads documents (ID, license, certificates)
    - Admins review request
    - On approval:
        - Badge added
        - Unlock features (moderation, visibility, trust)
        - Appears in verified lists and filters

5. UI INTEGRATION
    | Screen               | Action                                        |
    | -------------------- | --------------------------------------------- |
    | Profile Settings     | Apply for verification / Track referral stats |
    | Match Summary        | Share stat claim links                        |
    | Team Invite Flow     | Referral invite integration                   |
    | Post-Login Welcome   | Prompt to claim existing stats                |
    | Referral Leaderboard | Highlight top inviters                        |

6. REWARDS & XP
    | Action                        | XP / Badges             |
    | ----------------------------- | ----------------------- |
    | Invite used & account created | +25 XP                  |
    | Referral plays first match    | +50 XP                  |
    | Stat claim approved           | +20 XP                  |
    | Verified profile approved     | Badge + access          |
    | Reach 10 referrals            | “ReferralStarter” badge |
    | Referral earns MVP            | +10 XP bonus            |
    | Referral earns 100+ XP        | +10 XP bonus            |


## Team Account Infrastructure
1. CLASSES
    class TeamAccount {
        id: string;
        name: string;
        sport: SportType;
        city?: string;
        logoUrl?: string;
        bannerUrl?: string;
        verified: boolean;
        roster: TeamMembership[];
        stats: TeamStats;
        matchHistory: string[]; // Match IDs
        ranking: TeamRanking;
        followers: string[]; // userIds
        createdBy: string;
        createdAt: Date;
    }

    class TeamMembership {
        userId: string;
        role: TeamRole;
        joinedAt: Date;
        isActive: boolean;
        invitationStatus: 'Pending' | 'Accepted' | 'Declined';
    }

    class TeamStats {
        totalMatches: number;
        totalWins: number;
        avgPoints: number;
        avgAssists: number;
        winRate: number;
        mvpCount: number;
        topStatCategories: StatKey[];
    }

    class PlayerStats(Team{sport: SportType}){

    }

    class TeamRanking {
        tier: TeamTier;
        xp: number;
        badgeIds: string[];
        leaderboardPosition?: number;
        globalRank: number;
        sportRank: number;
        cityRank?: number;
    }

    class TeamInviteCode {
        code: string;               // Unique short code or token
        teamId: string;
        role: TeamRole;
        expiresAt?: Date;
        usesRemaining?: number;
        createdBy: string;          // userId
        createdAt: Date;
        isActive: boolean;
    }


2. TEAM ACCOUNT CREATION FLOW
    User reaches level 15 (or is verified coach)

        Opens Team Creation Wizard

        Inputs:

        Team name

        Sport

        City/Location (optional)

        Logo & Banner (optional)

        Team created, user becomes Coach or Captain

        Can invite others or generate join link

        Team verification unlocks badges, tournament access, and branding features

3. TEAM ACCOUNT MANAGEMENT FLOW
    | Feature                           | Enabled         |
    | --------------------------------- | --------------- |
    | Invite player by username or link | ✅              |
    | Accept/reject invite              | ✅              |
    | Remove player from roster         | ✅              |
    | Role assignment & change          | ✅              |
    | Pending status                    | ✅              |
    | Roster size limit (configurable)  | ✅              |
    | Player lock for tournaments       | ⚙️ Future (V5)  |

4. TEAM MATCH HISTORY
    Matches tagged with team (via match setup or stat assignment)
    Team can be host, opponent, or multi-team tournament participant
    Match data is aggregated into team-level analytics
    MVPs, score trends, stat leaders visible at team dashboard

5. TEAM INVITE CODE FLOW
    Coach generates invite (optionally setting role, expiry date, use limit)
    User clicks link or enters code → sees team info and role being invited into
    If accepted:
        Joins team in the assigned role
        TeamMembership created with status Accepted
        If expired or maxed out → rejected with message


5. UI INTEGRATION
    | Screen            | Description                               |
    | ----------------- | ----------------------------------------- |
    | **Team Page**     | Logo, banner, roster, stats, badges, fans |
    | **Profile Page**  | Show user’s current team (if any)         |
    | **Match Setup**   | Use official team as match participant    |
    | **Match Summary** | Tag match to official team if applicable  |
    | **Team Chat**     | Auto-created on team setup                |
    | **Team Feed**     | Posts, highlights, fan reactions (future) |

6. CONNECTED SYSTEMS
    | Feature                 | Connection                                       |
    | ----------------------- | ------------------------------------------------ |
    | `StatEngine`            | Aggregates player stats into team profile        |
    | `MatchEngine`           | Allows team match linking                        |
    | `ReferralSystem`        | Share invite as referral = dual benefit          |
    | `BadgeSystem`           | Unlock team badges (win streak, MVPs, followers) |
    | `LeaderboardEngine`     | Team XP → Tier → Rank                            |
    | `CommunitySystem`       | Auto-generate team chat room                     |
    | `VerifiedProfileSystem` | Verified teams gain visual distinction, perks    |

7. FEATURE EXTENSION
    | Feature                   | Notes                             |
    | ------------------------- | --------------------------------- |
    | Team Jersey Upload        | Design + register jersey          |
    | Tournament Registration   | Use team ID to sign up for events |
    | Team Sponsorships         | Businesses can back teams         |
    | Team Fanbase Growth       | Fans follow teams for updates     |
    | Team Page Posts & Stories | Shared by players/captains        |



## enums
DEFINING MISSING ENUMS
- SportType
    enum SportType {
        Basketball = "Basketball",
        Football = "Football",
        TableTennis = "TableTennis",
        Volleyball = "Volleyball",
        Badminton = "Badminton"
    }

- MatchMode
    enum MatchMode {
        Casual = "Casual",
        Competitive = "Competitive"
    }

- MatchType
    enum MatchType {
        Single = "Single",
        SetBased = "SetBased",
        Tournament = "Tournament",
        Rotational = "Rotational"
    }

- StatIntensity
    enum StatIntensity {
        Basic,
        Intermediate,
        Advanced,
        Professional
    }


- PlayerSourceType
    enum PlayerSourceType {
        ManualEntry = "ManualEntry",
        Suggested = "Suggested",
        Regular = "Regular",
        Pinned = "Pinned",
        OfficialTeam = "OfficialTeam"
    }

- LocationType
    enum LocationType {
        Court = "Court",
        Field = "Field",
        Indoor = "Indoor",
        Outdoor = "Outdoor",
        Club = "Club",
        School = "School"
    }

- Ammenities
    enum Ammenities {
        Showers = "Showers",
        Lockers = "Lockers",
        ChangingRooms = "ChangingRooms",
        Parking = "Parking",
        Wifi = "Wifi",
        Restrooms = "Restrooms",
        Seating = "Seating",
        Benches = "Benches",
        Bleachers = "Bleachers",
        SpectatorArea = "SpectatorArea",
        Security = "Security",
    }

- UserPrivacyOption
    enum UserPrivacyOption {
        Public = "Public",
        FriendsOnly = "FriendsOnly",
        Private = "Private"
    }

- ReferralSource
    enum ReferralSource {
        MatchInvite = "MatchInvite",
        Tournament = "Tournament",
        Community = "Community",
        LocationShare = "LocationShare"
    }

- ScoringSystem
    enum ScoringSystem {
        Standard = "Standard",
        Streetball = "Streetball",
        Fiba3x3 = "Fiba3x3",
        Rally = "Rally",
        SideOut = "SideOut"
    }

- BadgeType
    enum BadgeType {
        General,
        AccountBased,
        SportBased,
        LocationBased,
        EventBased,
        Verified
    }

- RankingTier
    enum RankingTier {
        Rookie,
        Contender,
        AllStar,
        Elite,
        Legend
    }

- LeaderboardType
    enum LeaderboardType {
        Global,
        SportSpecific,
        LocationBased,
        TimeBound, // Weekly, Monthly
        CustomEvent
    }

- ConnectionType
    enum ConnectionType {
        Friend,         // Mutual, 2-way
        Fan,            // One-way: Any → Player or Coach
        Supporter,      // One-way: Any → Team
        Follower 
    }

- ConnectionStatus
    enum ConnectionStatus {
        Pending,
        Accepted,
        Declined,
        Blocked
    }

- AccountType
    enum AccountType {
    Player,
    Coach,
    Team,
    Business,
    Viewer
    }

- PostType
    enum PostType {
        Text,
        MatchHighlight,
        BadgeEarned,
        MatchPlayed,
        LocationReview,
        TournamentParticipation,
        TrainingSession,
        Image,
        Video,
        ActivityUpdate,
        Poll
    }
- PostVisibility
    enum PostVisibility {
        Public,
        FriendsOnly,
        Private
    }
- MediaType
    enum MediaType {
        Image,
        Video
    }
- ReactionType
    enum ReactionType {
        Like,
        Love,
        Haha,
        Wow,
        Sad,
        Angry
    }


- TagTarget
    enum TagTarget {
    User,
    Team,
    Location,
    Match,
    Sport
    }
- MessageThreadType
    enum MessageThreadType {
    Direct,     // 1-on-1
    Group,      // Custom user-created group
    Team,       // Linked to team account
    Referral,   // For stat-claim or invite flows
    Support     // Admin system use
    }
- MessageType
    enum MessageType {
    Text,
    Image,
    Video,
    MatchLink,
    Poll,
    ReferralLink,
    LocationInvite,
    TeamInvite,
    StatClaimRequest
    }
- ChatRoomType
    enum ChatRoomType {
        Public,
        Private,
        Team,
        Referral,
        Support
    }
- MatchRecordingStatus
    enum MatchRecordingAction {
        Started,
        Ended,
        Recorded,
        Disputed,
        Resolved
    }
- MatchAccessType
    enum MatchAccessType {
        InviteOnly,     // Must be invited or approved
        CodeEntry,      // Joinable by session code
        PublicSpectator // Anyone can view, cannot edit
    }
- MatchUserRole
    enum MatchUserRole {
        Host,         // Full access: stats, match rules, timer, media
        Recorder,     // Can log stats only
        Viewer,       // Can watch stats/live updates
        Coach,        // Can record & annotate
        Validator     // Confirms or disputes stats after match
    }
- SportRankTitle
    enum SportRankTitle {
        Rookie,
        Starter,
        Competitor,
        Specialist,
        Captain,
        All-Star,
        MVP,
        Legend
    }
- LocationRankTitle
    enum LocationRankTitle {
        First-Timer,
        Regular,
        Resident,
        Local Hero,
        Court Boss,
        Court Legend
    }
- BadgeCategory
    enum BadgeCategory {
        Milestone,
        Achievement,
        Tournament,
        Performance,
        Community,
        Referral,
        Verified
    }
- BadgeTrigger
    enum BadgeTrigger {
        Auto,          // System awards instantly on criteria met
        Manual,        // User claims it from profile when goal is reached
        VerifiedOnly,  // Requires match from verified session or account
        AdminApproval  // Only admins can grant (e.g. for awards/events)
    }
- BadeRarity
    enum BadgeRarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary,
        VerifiedOnly // Exclusive to verified matches
    }
- LeaderboardType
    enum LeaderboardType {
        Global,
        Sport,
        Stat,
        Team,
        Location,
        Challenge
    }
-  LocationBadge
    enum LocationBadge {
        FirstTimeAtLocation, // Auto
        CourtRegular,
        LocalHero,
        CourtBoss,
        CourtLegend,
        MostMatchesAtCourt // VerifiedOnly
    }
- SocialBadge
    enum SocialBadge {
        FriendMaker,
        SuperFan,
        TeamCaptain,
        SocialButterfly,
        CommunityVoice,
        PostChampion,
        Commentator,
        PollMaster,
        Trendsetter,
        HashtagChampion,
        VerifiedPoster
    }
- SportBadge(Basketball)
    enum BasketballBadge {
        First3Pointer,           // Auto
        TripleDouble,            // VerifiedOnly
        50PointGame,             // VerifiedOnly
        BlockMaster,             // Auto
        AssistKing,              // Auto
        FreeThrowPerfect,        // Auto
        StealMachine,            // Auto
        ReboundChamp,            // Auto
        TurnoverTrouble,         // Auto
        Sharpshooter,            // Auto
        DefensiveGenius,         // Auto
        OffensiveMaestro,        // Auto
        AllRounder,              // Auto
        MVPFirstTime,            // Auto
        MVP10Times,              // Auto
        MVP50Times,              // Auto
        MVP100Times,             // Auto
        MVPStreak3,              // Auto
        MVPStreak7,              // Auto
    }
- SportBadge(Football)
    enum FootballBadge {
        FirstGoal,               // Auto
        GoalScorer10Times,       // Auto
        GoalScorer50Times,       // Auto
        GoalScorer100Times,      // Auto
        GoalScorerStreak3,       // Auto
        GoalScorerStreak7,       // Auto
        AssistMaster,            // Auto
        SaveKing,                // Auto
        CardTrouble,             // Auto
        HatTrick,                // Auto
        GoalkeeperChamp,         // Auto
        DefenderOfTheYear,       // Auto
        OffensivePlayerOfTheYear, // Auto
        AllRounder,              // Auto
        MVPFirstTime,            // Auto
        MVP10Times,              // Auto
        MVP50Times,              // Auto
        MVP100Times,             // Auto
        MVPStreak3,              // Auto
        MVPStreak7,              // Auto
    }
- SportBadge(Volleyball)
    enum VolleyballBadge {
        FirstPoint,              // Auto
        PointMaster,             // Auto
        PointStreak3,            // Auto
        PointStreak7,            // Auto
        SpikeChamp,              // Auto
        DigMaster,               // Auto
        ServeAceKing,            // Auto
        BlockMaster,             // Auto
        AllRounder,              // Auto
    }
- SportBadge(TableTennis)
    enum TableTennisBadge {
        FirstWin,                // Auto
        WinMaster,               // Auto
        WinStreak3,              // Auto
        WinStreak7,              // Auto
        ServeAceKing,            // Auto
        BlockMaster,             // Auto
        AllRounder,              // Auto
    }
- SportBadge(Badminton)
    enum BadmintonBadge {
        FirstWin,                // Auto
        WinMaster,               // Auto
        WinStreak3,              // Auto
        WinStreak7,              // Auto
        AceMaster,               // Auto
        BlockMaster,             // Auto
        AllRounder,              // Auto
    }
- GeneralBadge
    enum GeneralBadge {
        FirstMatch,              // Auto
        FirstWin,                // Auto
        10MatchesPlayed,         // Auto
        100MatchesPlayed,        // Auto
        10Wins,                  // Auto
        Streak3,                 // Auto
        Streak7,                 // Auto
        MatchLogger,             // Auto
        ConsistencyKing,         // Auto
        MVPFirstTime,            // Auto
        MVP10Times,              // Auto
        MVP50Times,              // Auto
        MVP100Times,             // Auto
        MVPStreak3,              // Auto
        MVPStreak7,              // Auto
        ReferralChamp,           // Auto
        VerifiedBadge,           // AdminApproval
        EarlyAdopter,            // Auto
        BetaTester,              // Auto
        BugHunter,               // Auto
        FeatureRequest,          // Auto}
- AccountBadge
    enum AccountBadge {
        CoachCertified,          // VerifiedOnly
        BusinessVerified,        // Auto
        TeamVerified,
        Recruiter,
        PopularUser,
        ReferralStarter,
        ReferralLeader,
        ProfileComplete,         // Auto
        ReferralChampion,        // Auto
        Supporter,               // Auto
        FanClubMember,           // Auto
        VerifiedAccount,         // AdminApproval
        BusinessPartner,         // AdminApproval
        TeamSupporter,           // Auto
        CoachMentor,             // Auto
        CommunityLeader          // Auto
    }
- ChallengeType
    enum ChallengeType {
        Solo,
        Global,
        Team
    }
- ChallengeDuration
    enum ChallengeDuration {
        Daily,
        Weekly,
        Monthly,
        Seasonal
    }
- ChallengeBadge
    enum ChallengeBadge {
        WeekendWarrior,
        HolidayHustler,
        7DayStreak,
        MonthlyMVP,
        ChallengeWinner
    }

- BadgeSortMode
    enum BadgeSortMode {
        MostRecent,
        Rarity,
        Category,
        Alphabetical
    }


- ReferralStatus
    enum ReferralStatus {
        Pending,
        Claimed,
        Expired,
        Canceled
    }
- ClaimStatus
    enum ClaimStatus {
        Pending,
        Approved,
        Rejected,
        AutoApproved
    }

- VerificationType
    enum VerificationType {
        Coach,
        Business,
        Athlete,
        LocationOwner
    }
- VerificationStatus
    enum VerificationStatus {
        Pending,
        Approved,
        Rejected
    }
- TeamRole
    enum TeamRole {
        Coach,
        Captain,
        Player,
        Analyst,
        Manager,
        Supporter
    }

- TeamTier
    enum TeamTier {
        Bronze,
        Silver,
        Gold,
        Platinum,
        Elite
    }


## Note
    | Category             | # of Items to Define              |
    | -------------------- | --------------------------------- |
    | StatKeys (per sport) | 5 sets (initial)                  |
    | StatCategories       | 15+ (across sports & intensities) |
    | Badge List           | 30–50 for V1–V2 scope             |...
    | XP/Rank Rules        | 1 set per sport or system         |
    | RuleSets & Scoring   | 2–4 per sport                     |
    | Validator Rules      | 5+ per sport                      |
    | Leaderboard Scopes   | \~5 types                         |
    | Expansion Templates  | 1 universal format                |

    Possibility of bussiness types under account types to fit in location

    stays in the group chat- security 
    Ml for user preference to display relevant content
    session activity feed FOR LIVE RECORDING (e.g. "Coach added 5 points")

    Team rank entry needs a bit of re-work