import { useEffect } from "react";
import { useToast } from "ui";


interface NotificationsProps {
    handleSelectReport: (report: Report) => void;
}

export const Notifications = ({ handleSelectReport }: NotificationsProps) => {
    const { toast } = useToast();

    useEffect(() => {
        const socket = new WebSocket("wss://api-gateway-978568328496.asia-east1.run.app/notification/push/namwoam");

        socket.addEventListener("open", () => {
        });

        socket.addEventListener("message", (event) => {
            // Handle incoming WebSocket messages
            const message: string = event.data;
            const { message: title, data } = JSON.parse(message);
            const report = JSON.parse(data);
            const content = report.content;
            toast({
                title: title,
                description: content.length > 100 ? content.slice(0, 100) + '...' : content,
                onClick: () => {
                    handleSelectReport(report);
                }
            });
            console.log(content)
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
