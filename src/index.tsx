import * as React from 'react'
import ControlsBar from './components/ControlsBar'
import Error from './components/Error'
import { randomHash, videoInitialize } from './utils'
import './index.less'

class Tmvr extends React.Component<any, any> {
    private videoId: any
    private video: any

    constructor(props: any) {
        super(props)

        this.state = {
            isError: false,
            isLoading: false
        }

        this.videoId = `video_${randomHash(6)}`
    }

    componentDidMount() {
        this.video = document.getElementById(this.videoId)
        this.video.setAttribute('webkit-playsinline', 'true')
        this.videoInit()
    }

    render() {
        const { isError } = this.state
        const { poster, url, controls = true, autoPlay = false } = this.props

        return (
            <div className="tmv-video-wrapper">
                <video
                    className="tmv-video"
                    src={url}
                    poster={poster}
                    id={this.videoId}
                    playsInline
                    autoPlay={autoPlay}></video>

                {isError ? (
                    <Error errorMessage={'NETWORK_ERROR'} />
                ) : (
                    controls && <ControlsBar videoId={this.videoId} {...this.props} />
                )}
            </div>
        )
    }

    videoInit = () => {
        const { type, autoPlay } = this.props

        videoInitialize({ type, autoPlay, video: this.video }, () => {
            this.setState({ isError: true })
        })
    }
}

export default Tmvr
