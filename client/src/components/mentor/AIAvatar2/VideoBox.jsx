
export default function VideoBox(props) {
    return (
        <div className="flex rounded-sm overflow-hidden items-center h-[550px] w-[450px] justify-center bg-simligray">
            <video ref={props.video} autoPlay playsInline></video>
            <audio ref={props.audio} autoPlay ></audio>
        </div>
    );
}