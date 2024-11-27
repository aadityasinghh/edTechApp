export interface VideoPlayerProps {
  videoUri: string;
  onFullScreenToggle: (isFullScreen: boolean) => void;
}
export interface ProgressState {
  currentTime: number;
  seekableDuration: number;
}
