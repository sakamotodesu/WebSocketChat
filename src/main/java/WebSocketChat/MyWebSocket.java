package WebSocketChat;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.eclipse.jetty.websocket.WebSocket;

public class MyWebSocket implements WebSocket.OnTextMessage {

    private Connection _connection;
    private static Set<MyWebSocket> _members = new CopyOnWriteArraySet<MyWebSocket>();

    @Override
    public void onClose(int arg0, String arg1) {
        _members.remove(this);

    }

    @Override
    public void onOpen(Connection connection) {
        _connection = connection;
        _members.add(this);

    }

    @Override
    public void onMessage(final String data) {
        for (MyWebSocket member : _members) {
            try {
                member._connection.sendMessage(data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
