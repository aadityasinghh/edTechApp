export interface DownloadedVideo {
  contentId: number;
  source: string;
  artistName: string;
  songName: string;
  downloadDate: Date;
  posterImage: string;
  isAudio: boolean;
}
export interface DownloadProgress {
  contentId: number;
  source: string;
  artistName: string;
  songName: string;
  progressValue: string;
}
