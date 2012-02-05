package WebSocketChat;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class WebSocketChat {

    /**
     * @param args
     * @throws Exception 
     */
    public static void main(String[] args) throws Exception {
        // TODO Auto-generated method stub
        new WebSocketChat();
    }

    public WebSocketChat() throws Exception {

        Server server = new Server(8040);

        ResourceHandler rh = new ResourceHandler();
        rh.setResourceBase(this.getClass().getClassLoader().getResource("html").toExternalForm());

        MyWebSocketServlet wss = new MyWebSocketServlet();
        ServletHolder sh = new ServletHolder(wss);
        ServletContextHandler sch = new ServletContextHandler();
        sch.addServlet(sh, "/ws/*");

        HandlerList hl = new HandlerList();
        hl.setHandlers(new Handler[]{rh, sch});
        server.setHandler(hl);

        server.start();

    }

}
