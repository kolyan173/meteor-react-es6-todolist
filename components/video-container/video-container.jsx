VideoContainer = React.createClass({
	getInitialState() {
		return {
			peerId: '',
			theirVideoUrl: '',
			myVideoUrl: '',
			remotePeerId: ''
		};
	},
	componentDidMount() {
		peer = new Peer({
			key: 'pfrsknhhh2iq9f6r',
			debug: 3,
			config: {
				'iceServers': [
					{ url: 'stun:stun.l.google.com:19302' },
					{ url: 'stun:stun1.l.google.com:19302' },
				]
			}
		});

		peer.on('open', (id) => {
			this.setState({ peerId: id });
	    });

	    peer.on('call', (incomingCall) => {
			currentCall = incomingCall;
			incomingCall.answer(localStream);
			
			incomingCall.on('stream', (stream) => {
				remoteStream = stream;
				console.log(URL.createObjectURL(stream));
				this.setState({ theirVideoUrl: URL.createObjectURL(stream) });
			});
	    });

	    navigator.getUserMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia );

	    // get audio/video
	    navigator.getUserMedia({
	    	audio:true,
	    	video: true
	    }, (stream) => {
			this.setState({ myVideoUrl: URL.createObjectURL(stream) });
			localStream = stream;
	    }, (error) => { console.log(error); });
	},

	makeCall() {
		console.log(this.state.remotePeerId);
		let outGoingCall = peer.call(this.state.remotePeerId, localStream);

		currentCall = outGoingCall;

		outGoingCall.on('stream', (stream) => {
			remoteStream = stream;
			this.setState({ theirVideoUrl: URL.createObjectURL(stream) });
		});
	},

	endCall() {
		currentCall.close();
	},

	handleRemotePeerType(e) {
		this.setState( { remotePeerId: this.refs.remotePeerId.value });
	},

	render() {
		return (
			<div className="video-container">
				Their video: 
				<video ref="theirVideo"
					src={this.state.theirVideoUrl}
					className="theirVideo"
					autoPlay
				></video>
      			<video ref="myVideo"
      				src={this.state.myVideoUrl}
      				muted="true"
      				className="myVideo"
      				autoPlay
  				></video>
      			: Your video

      			<h2>Controls</h2>
			
			    <div>
					<p>
						Your id:
						<span ref="myPeerId">
							{ this.state.peerId || '...' }
						</span>
					</p>
					<p>Make a call</p>
					<br/>
					<input type="text"
						ref="remotePeerId"
						placeholder="Call user id..."
						value={this.state.remotePeerId}
						onChange={this.handleRemotePeerType}
					/>
					<p>
						<button onClick={this.makeCall} ref="makeCall">Call</button>
					</p>
					<p>
						<button onClick={this.endCall} ref="endCall">End call</button>
					</p>
			    </div>
			</div>
		);
	}
});