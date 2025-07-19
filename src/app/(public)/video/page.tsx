import VideoCall from '@/components/UI/VideoCall/VideoCall';
import { use } from 'react';
// Define page props type locally
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const VideoCalling = ({ searchParams }: PageProps) => {
  const resolvedSearchParams = use(searchParams!);
  const videoCallingId = resolvedSearchParams?.videoCallingId;

  return <VideoCall videoCallingId={videoCallingId as string} />;
};

export default VideoCalling;
