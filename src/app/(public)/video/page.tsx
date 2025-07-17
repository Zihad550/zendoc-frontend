import VideoCall from "@/components/UI/VideoCall/VideoCall";
import { PageProps } from "../../../../.next/types/app/(public)/video/page";

const VideoCalling = ({ searchParams }: PageProps) => {
  const videoCallingId = searchParams.videoCallingId;

  return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCalling;
