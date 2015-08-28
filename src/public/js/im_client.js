
var getImClient = function() {
	var res = {};
	var sockId;
	var agentId;
	var connected = false;

	var requestMap = {};
	var reqidAcc = 0;

	var recvAckMap = {
		"7": 20,
		"11": 20,
		"19": 20
	};


	/*******************************/
	/* yacca client
	/*******************************/
	var ya = getYaccaClient();
	ya.sockid = function(id) {
		sockId = id;
		connected = true;
		ya.getAgents();
		res.onConnect && res.onConnect();
	};
	ya.agents = function(agentList) {
		var idx = Math.floor(Math.random() * agentList.length);
		agentId = agentList[idx];
		res.handshakeOk && res.handshakeOk();
	};
	ya.disconnected = function() {
		connected = false;
		setTimeout(function() { ya.connect(); }, 5000);
	};
	ya.msg = function(sender, msg) {
		var str = UTF8.decode(msg);
		var json = JSON.parse(str);
		if("reqid" in json) {
			var reqid = json["reqid"];

			// if is in requestMap, the msg is a ack message
			if(reqid in requestMap) {
				var callback = requestMap[reqid];
				delete requestMap[reqid];
				delete json["reqid"];
				callback && callback(json);
				return;
			} else {
				if( "t" in json ) {
					var t = json["t"];
					// check t is need ack
					if( t in recvAckMap ) {
						var ackT = recvAckMap[t];
						if( res.recv && res.recv(json) ) {
							sendToAgent(sender, {
								"t": ackT,
								"reqid": reqid,
								"rt":t
							});
							return;
						}
					}
				}
			}
		}
		// res.recv && res.recv(json);
		throw "Invalid message";
	};
	var send = function(data) {
		var str = JSON.stringify(data);
		var bin = UTF8.encode(str);
		ya.sendMsg([agentId], bin);
	};

	function sendToAgent(agent, data) {
		var str = JSON.stringify(data);
		var bin = UTF8.encode(str);
		ya.sendMsg([agent], bin);
	}

	var convey = function(data) {
		var str = JSON.stringify(data);
		var bin = UTF8.encode(str);
		ya.convey(bin);
	};

	/*******************************/
	/* res
	/*******************************/
	res.setHosts = function(hs) {
		ya.setHosts(hs);
	};
	res.setAppName = function(app) {
		ya.setAppName(app);
	};
	res.handshake = function() {
		if(connected) {
			ya.getAgents();
		} else {
			ya.connect();
		}
	};
	res.connect = function() {
		if (!connected) {
			ya.connect();
		};
	}

	res.request = function(obj) {
		var json = obj.json;
		var timeout = typeof(obj.timeout) == 'undefined' ? 1000 : obj.timeout;
		var conveyFlag =  typeof(obj.conveyFlag) == 'undefined' ? true : obj.conveyFlag;
		var okCallback = obj.okCallback;
		var errCallback = obj.errCallback;
		var reqid = ++reqidAcc;
		json.reqid = reqid;
		requestMap[reqid] = okCallback;
		setTimeout(
			function() {
				if(reqid in requestMap) {
					delete requestMap[reqid];
					errCallback("timeout");
				}
			}, 
			timeout
		);
		if (conveyFlag) {
			convey(json);
		} else{
			send(json);
		};
	}

	res.recv = null;
	res.handshakeOk = null;
	res.onConnect = null;

	return res;
};
