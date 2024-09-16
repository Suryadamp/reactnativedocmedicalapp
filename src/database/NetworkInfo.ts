class NetworkManager {
    private static instance: NetworkManager;
    public static getInstance(): NetworkManager {
        if (!NetworkManager.instance) {
            NetworkManager.instance = new NetworkManager();
        }

        return NetworkManager.instance;
    }
}