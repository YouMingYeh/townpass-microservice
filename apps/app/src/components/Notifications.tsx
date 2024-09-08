import { useEffect } from "react";
import { useToast } from "ui";

export const Notifications = () => {
    const { toast } = useToast();

    useEffect(() => {
        const socket = new WebSocket("wss://api-gateway-978568328496.asia-east1.run.app/notification/push/namwoam");

        socket.addEventListener("open", () => {
        });

        socket.addEventListener("message", (event) => {
            // Handle incoming WebSocket messages
            const message: string = event.data;
            toast({
                title: '收到新通知',
                description: message,
            });
        });

        socket.addEventListener("close", () => {
            // WebSocket connection is closed
            // toast("WebSocket connection closed");
        });

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
        </div>
    );
};
