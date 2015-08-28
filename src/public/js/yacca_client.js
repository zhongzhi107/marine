/*
  yacca_sdk  javascript version 1.0
  by Zoe
 */





// UTF-8
/*
UCS-4编码                     UTF-8字节流
U+00000000 – U+0000007F     0xxxxxxx
U+00000080 – U+000007FF     110xxxxx 10xxxxxx
U+00000800 – U+0000FFFF     1110xxxx 10xxxxxx 10xxxxxx
U+00010000 – U+001FFFFF     11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
U+00200000 – U+03FFFFFF     111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
U+04000000 – U+7FFFFFFF     1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
*/
var UTF8 = function() {
    var utf8byte = function(c, right, width, base) {
        return ( (c >> right) & ((1 << width) - 1) ) + base;
    }

    var utf8TwoByteArray = function(s) {

        var arr = [];
        for(var i = 0; i < s.length; ++i) {
            var c = s.charCodeAt(i);
            if(c >= 0x0 && c <= 0x7F) {
                arr.push(c);    
            } else if(c >= 0x80 && c <= 0x7FF) {
                arr.push(utf8byte(c, 6, 5, 0xC0));
                arr.push(utf8byte(c, 0, 6, 0x80));
            } else if(c >= 0x800 && c <= 0xFFFF) {
                arr.push(utf8byte(c, 12, 4, 0xE0));
                arr.push(utf8byte(c, 6, 6, 0x80));
                arr.push(utf8byte(c, 0, 6, 0x80));
            } else if(c >= 0x10000 && c <= 0x1FFFFF) {
                arr.push(utf8byte(c, 18, 3, 0xF0));
                arr.push(utf8byte(c, 12, 6, 0x80));
                arr.push(utf8byte(c, 6, 6, 0x80));
                arr.push(utf8byte(c, 0, 6, 0x80));
            } else if(c >= 0x200000 && c <= 0x3FFFFFF) {
                arr.push(utf8byte(c, 24, 2, 0xF8));
                arr.push(utf8byte(c, 18, 6, 0x80));
                arr.push(utf8byte(c, 12, 6, 0x80));
                arr.push(utf8byte(c, 6, 6, 0x80));
                arr.push(utf8byte(c, 0, 6, 0x80));
            } else if(c >= 0x4000000 && c <= 0x7FFFFFFF) {
                arr.push(utf8byte(c, 30, 1, 0xFC));
                arr.push(utf8byte(c, 24, 6, 0x80));
                arr.push(utf8byte(c, 18, 6, 0x80));
                arr.push(utf8byte(c, 12, 6, 0x80));
                arr.push(utf8byte(c, 6, 6, 0x80));
                arr.push(utf8byte(c, 0, 6, 0x80));
            } else {
                throw "Invalid UTF-8";
            }
        }
        return arr;
    };

    var byteCode = function(b, width, left) {
        return ( b & ((1 << width) - 1) ) << left;
    }


    var byteArray2Utf8 = function(arr) {

        var state = 0;
        var i = 0;
        var code = 0;
        var codes = [];
        while(i < arr.length) {
            var b = arr[i];

            if((b & 0x80) == 0x0) {
                codes.push(b);
                i += 1;
            } else if((b & 0xE0) == 0xC0) {
                codes.push(
                    byteCode(b, 5, 6) + 
                    byteCode(arr[i+1], 6, 0)
                );
                i += 2; 
            } else if((b & 0xF0) == 0xE0) {
                codes.push(
                    byteCode(b, 4, 12) +
                    byteCode(arr[i+1], 6, 6) +
                    byteCode(arr[i+2], 6, 0)
                );
                
                i += 3;
            } else if((b & 0xF8) == 0xF0) {
                codes.push(
                    byteCode(b, 3, 18) +
                    byteCode(arr[i+1], 6, 12) +
                    byteCode(arr[i+2], 6, 6) +
                    byteCode(arr[i+3], 6, 0)
                );
                i += 4;
            } else if((b & 0xFC) == 0xF8) {
                codes.push(
                    byteCode(b, 2, 24) +
                    byteCode(arr[i+1], 6, 18) +
                    byteCode(arr[i+2], 6, 12) +
                    byteCode(arr[i+3], 6, 6) +
                    byteCode(arr[i+4], 6, 0)
                );
                i += 5;
            } else if((b & 0xFE) == 0xFC) {
                codes.push(
                    byteCode(b, 1, 30) +
                    byteCode(arr[i+1], 6, 24) +
                    byteCode(arr[i+2], 6, 18) +
                    byteCode(arr[i+3], 6, 12) +
                    byteCode(arr[i+4], 6, 6) +
                    byteCode(arr[i+5], 6, 0)
                );
                i += 6;
            } else {
                throw "Invalid UTF-8";
            }
        }

        return String.fromCharCode.apply(null, codes);
    };

    return {
        encode: utf8TwoByteArray,
        decode: byteArray2Utf8
    };

}();


var getYaccaClient = function(){

    var res = {};
    var ws = null;
    var content;
    var timeout = 60000;
    var timer = null;

    var hosts = [];
    res.setHosts = function(hs) {
        hosts = hs;
    };

    var appName = "";
    res.setAppName = function(app) {
        appName = app;
    };



    // client sdk events
    res.sockid = null;
    res.agents = null;
    res.msg = null;
    res.disconnected = null;
    
    //setApp(AppName)  <<1,AppName:4B String>>
    // appName is a byte array
    var setApp = function() {
        var totalLen = appName.length + 5;
        cmd = new ArrayBuffer(totalLen);
        var dv = new DataView(cmd);
        dv.setUint8(0, 1);
        dv.setUint32(1, appName.length, false);
        var name = new Uint8Array(cmd, 5);
        name.set(appName, 0);
        if (ws != null) {
           ws.send(cmd);
        }
    };

    var heartbeat = function() {
        if(ws != null) {
            ws.send( (new Uint8Array([0])).buffer );
        }
    }


    var startHeartbeat = function() {
        if(timer != null) {
            clearInterval(timer);
        }
        timer = setInterval(heartbeat, timeout/2);
    }

    var analyseMsg = function(blob) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var buffer = reader.result;
            var dv = new DataView(buffer);

            var eType = dv.getUint8(0);
            var num = dv.getUint32(1, false);

            switch(eType) {
                /*
                    message(SenderId, Msg)
                    收到消息
                    << 2, DataLen:32/big, (<< SenderId:32/big, Msg/binary >>):DataLen/binary >>
                    SenderId是发送者的id，只可能是某个agent
                */
                case 2:
                    var sender = dv.getUint32(5, false);
                    var msg = new Uint8Array(buffer, 9);
                    res.msg && res.msg(sender, msg);
                    break;
                
                /*
                    sock_id(Id)
                    连接成功
                    << 13, Id:32/big >>
                    当setApp成功后会收到这个事件，可以得知自己在core中的id
                */
                case 13:
                    res.sockid && res.sockid(num);
                    startHeartbeat();
                    break;

                /*
                    get_targets(IdList)
                    得到agent列表
                    << 11, DataLen:32/big, Data:DataLen/binary >>, IdList = [ Id || <<Id:32/big>> <= Data ]
                    得到所有在线agent的id列表
                */
                case 11:
                    var count = num / 4;
                    var offset = 5;
                    agents = [];
                    for(var i = 0; i < count; ++i) {
                        agents.push(dv.getUint32(offset, false));
                        offset += 4;
                    }
                    res.agents && res.agents(agents);
                    break;

                /*
                    setTimeout(Timeout)
                    更新client连接超时
                    << 12, Timeout:32/big >>
                    一个client的默认超时是1分钟（DefaultTimeout = 60000），
                    即1分钟内没有任何数据交互（包含心跳），连接就会被主动断开，
                    当agent更新了该链接的超时时间设置后, client会收到此消息, 单位是毫秒
                */
                case 12:
                    timeout = num;
                    startHeartbeat();
                    break;
            }
        }
        reader.readAsArrayBuffer(blob);
    }


    //client sdk connect
    res.connect = function() {
        if(ws != null) {
            // is connected
            return;
        }

        if(hosts.length == 0) {
            throw "No yacca host!";
        }
        var host = hosts.shift();
        hosts.push(host);

        ws = new WebSocket(host);
        ws.onopen = function(open) {
            setApp(appName);
        };
        
        ws.onmessage = function(msg) {
            // analyse msg
            analyseMsg(msg.data);
        };
        
        ws.onclose = function(close) {
            clearInterval(timer);
            timer = null;
            timeout = 60000;
            ws = null;
            res.disconnected && res.disconnected();
        };
        ws.onerror = function(error){
            ws.onclose(error);
        };

    };

    res.disconnect = function() {
        if(ws != null) {
            ws.close();
        }
    };

    //client sdk targets()  <<11>>
    res.getAgents = function() {
        if (ws != null) {
           ws.send( (new Uint8Array([11])).buffer );
        }
    };
    
    //client sdk set_message(IdList,Msg)  << 2, (size(IdBin)):32/big, IdBin/binary, (size(Msg)):32/big, Msg/binary >>,IdBin = list_to_binary( [ << Id:32/big >> || Id <- IdList] )
    // agentList is a id list
    // message is a byte array
    res.sendMsg = function(agentList, message) {
        var listLen = (4 * agentList.length);
        var totalLen = 1 + 4 + listLen + 4 + message.length;

        cmd = new ArrayBuffer(totalLen);
        var dv = new DataView(cmd);
        dv.setUint8(0, 2);
        dv.setUint32(1, listLen, false);

        var offset = 5;
        for(var i = 0; i < agentList.length; ++i) {
            dv.setUint32(offset, agentList[i], false);
            offset += 4;
        }


        dv.setUint32(offset, message.length, false);
        offset += 4;

        var msg = new Uint8Array(cmd, offset);
        msg.set(message, 0);

        if(ws != null) {
            ws.send(cmd);
        }
    };
    
    //client sdk send_notice(Msg) <<3,Msg:4B String>>
    res.notice = function(message) {
        cmd = new ArrayBuffer(5+message.length);
        var dv = new DataView(cmd);
        dv.setUint8(0, 3);
        dv.setUint32(1, message.length, false);

        var msg = new Uint8Array(cmd, 5);
        msg.set(message, 0);

        if (ws != null) {
           ws.send(cmd);
        }       
    };

    //client sdk send_convey(Msg) <<4,Msg:4B String>>
    res.convey = function(message) {
        cmd = new ArrayBuffer(5+message.length);
        var dv = new DataView(cmd);
        dv.setUint8(0, 4);
        dv.setUint32(1, message.length, false);

        var msg = new Uint8Array(cmd, 5);
        msg.set(message, 0);

        if (ws != null) {
           ws.send(cmd);
        }       
    };
    
    return res;
};