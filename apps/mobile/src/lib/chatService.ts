import { ChatRoom, ChatMessage } from './location-types';

/**
 * ChatService handles community chat rooms for locations
 * Data is persisted in localStorage under the "athlee_chatrooms" key
 */
class ChatService {
  private readonly STORAGE_KEY = 'athlee_chatrooms';

  /**
   * Get all chat rooms from storage
   */
  private getAllChatRooms(): ChatRoom[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save chat rooms to storage
   */
  private saveChatRooms(rooms: ChatRoom[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rooms));
    } catch (error) {
      console.error('Failed to save chat rooms:', error);
    }
  }

  /**
   * Get or create a chat room for a location
   */
  public getOrCreateChatRoom(locationId: string, locationName: string): ChatRoom {
    const rooms = this.getAllChatRooms();
    let room = rooms.find((r) => r.locationId === locationId);

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
   */
  public getChatRoomById(chatId: string): ChatRoom | null {
    return this.getAllChatRooms().find((r) => r.id === chatId) || null;
  }

  /**
   * Get a chat room by location ID
   */
  public getChatRoomByLocationId(locationId: string): ChatRoom | null {
    return this.getAllChatRooms().find((r) => r.locationId === locationId) || null;
  }

  /**
   * Add a member to a chat room
   */
  public addMember(chatId: string, userId: string): ChatRoom | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

    if (!room) return null;
    if (!room.members.includes(userId)) {
      room.members.push(userId);
      this.saveChatRooms(rooms);
    }

    return room;
  }

  /**
   * Remove a member from a chat room
   */
  public removeMember(chatId: string, userId: string): ChatRoom | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

    if (!room) return null;

    room.members = room.members.filter((u) => u !== userId);
    room.moderators = room.moderators.filter((u) => u !== userId);
    this.saveChatRooms(rooms);

    return room;
  }

  /**
   * Send a message to a chat room
   */
  public sendMessage(chatId: string, userId: string, text: string): ChatMessage | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

    if (!room) return null;

    const message: ChatMessage = {
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
   */
  public getMessages(chatId: string, limit: number = 100): ChatMessage[] {
    const room = this.getChatRoomById(chatId);
    if (!room) return [];

    return room.messages.slice(-limit);
  }

  /**
   * Nominate a user for moderator (moderator election)
   */
  public nominateModerator(chatId: string, candidateId: string): ChatRoom | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

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
   */
  public voteModerator(chatId: string, voterId: string, candidateId: string): ChatRoom | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

    if (!room) return null;

    if (!room.votes) {
      room.votes = {};
    }

    room.votes[voterId] = candidateId;

    // Check if election threshold reached (e.g., 10 members)
    if (room.members.length >= 10) {
      const VOTES_NEEDED = Math.ceil(room.members.length / 2);
      const voteCount: Record<string, number> = {};

      Object.values(room.votes).forEach((candidateId) => {
        voteCount[candidateId] = (voteCount[candidateId] || 0) + 1;
      });

      // Get top 2 candidates
      const sorted = Object.entries(voteCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

      if (sorted.length > 0 && sorted[0][1] >= VOTES_NEEDED) {
        room.moderators = sorted.map((entry) => entry[0]);
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
   */
  public startModeratorElection(chatId: string): ChatRoom | null {
    const rooms = this.getAllChatRooms();
    const room = rooms.find((r) => r.id === chatId);

    if (!room) return null;

    room.electionActive = true;
    room.candidates = [];
    room.votes = {};

    this.saveChatRooms(rooms);
    return room;
  }

  /**
   * Delete a chat room
   */
  public deleteChatRoom(chatId: string): boolean {
    const rooms = this.getAllChatRooms();
    const filtered = rooms.filter((r) => r.id !== chatId);

    if (filtered.length === rooms.length) return false;

    this.saveChatRooms(filtered);
    return true;
  }
}

export const chatService = new ChatService();
