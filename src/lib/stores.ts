import { useWritable } from './use-shared-store';

export const thumbnailImages = () => useWritable('thumbnailImages', []);
