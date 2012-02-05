//�O���[�o���ϐ���WebSocket�̕ϐ����`
var ws;

//getElementById�̕ʖ����`
function $(id){
  return document.getElementById(id);
}

//WebSocket���ڑ����ꂽ���ɁC�usend�v�{�^�����L���ɂȂ�
function onOpenWebSocket(){
  $("send").addEventListener("click",sendMessage,false);
  dispMessage("connected");
}

//WebSocket���ؒf���ꂽ���ɁC�usend�v�{�^���𖳌��ɂ���
function onCloseWebSocket(){
  $("send").removeEventListener("click",sendMessage,false);
  dispMessage("disconnected");
}

//�ڑ����胁�b�Z�[�W����M�������ɁC�󕶎��łȂ���Ή�ʂɕ\������
function onMessageWebSocket(event){
  var msg=event.data;
  if(msg==""){return;}
  dispMessage("> "+msg);
}

//�E�B���h�E��������ʑJ�ڂ�������WebSokcet��ؒf����
function onUnload(){
  ws.close();
}

//��ʂɃ��b�Z�[�W��\������
//��ɕ\������郁�b�Z�[�W���ŐV�ƂȂ�
function dispMessage(msg){
  var elem=document.createElement("div");
  elem.appendChild(document.createTextNode(msg));
  if($("messages").hasChildNodes()){
    $("messages").insertBefore(elem,$("messages").firstChild);
  }else{
    $("messages").appendChild(elem);
  }
}

//���b�Z�[�W���͗����󔒂łȂ���΃��b�Z�[�W�𑗐M����
function sendMessage(){
  var message=$("message").value;
  if(message==""){return;}
  ws.send(message);
  $("message").value="";
}

//����������
function initial(){

  //HTTPS�Őڑ�����Ă���ꍇ�CWebSocket���Z�L���A�ɂ���
  var protocol=(location.protocol=="https:")?"wss":"ws";

  //port�ԍ������݂Ŏ擾
  var host=location.host;

  //�ڑ���URL�̑g�ݗ���
  var url=protocol+"://"+host+"/ws/";

  //WebSocket�̃C���X�^���X��
  ws=new WebSocket(url);

  //WebSocket�̃C�x���g�̓o�^
  ws.onopen=onOpenWebSocket;
  ws.onclose=onCloseWebSocket;
  ws.onmessage=onMessageWebSocket;
  //�E�B���h�E��������ʑJ�ڂ�������WebSokcet��ؒf����
  window.addEventListener("unload",onUnload,false);

}

//�I�����[�h���̃C�x���g�ɁC�������֐����`
window.addEventListener("load",initial,false);
