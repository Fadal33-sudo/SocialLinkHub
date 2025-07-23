import { profiles, socialLinks, type Profile, type InsertProfile, type SocialLink, type InsertSocialLink } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  getSocialLinks(): Promise<SocialLink[]>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).limit(1);
    return profile || undefined;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async updateProfile(id: number, insertProfile: Partial<InsertProfile>): Promise<Profile | undefined> {
    const [updated] = await db
      .update(profiles)
      .set(insertProfile)
      .where(eq(profiles.id, id))
      .returning();
    return updated || undefined;
  }

  async getSocialLinks(): Promise<SocialLink[]> {
    return await db.select().from(socialLinks).orderBy(socialLinks.order);
  }

  async createSocialLink(insertSocialLink: InsertSocialLink): Promise<SocialLink> {
    const [socialLink] = await db
      .insert(socialLinks)
      .values(insertSocialLink)
      .returning();
    return socialLink;
  }

  async updateSocialLink(id: number, insertSocialLink: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const [updated] = await db
      .update(socialLinks)
      .set(insertSocialLink)
      .where(eq(socialLinks.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    const result = await db
      .delete(socialLinks)
      .where(eq(socialLinks.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();
