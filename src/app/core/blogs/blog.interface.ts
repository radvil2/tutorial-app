export interface IBlog {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: Array<string>;
  author: string;
  slug: string;
  likes: number;
  likedBy: Array<string>;
  isPublished: boolean;
  featureImage: string;
  featureImageId: string;
  images: Array<string>;
  createdAt: string; // or Date?
  updatedAt: string; // or Date?
}
