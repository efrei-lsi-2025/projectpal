import { getServerSession, getToken } from "#auth";

export default eventHandler(async (event) => {
  const clientSideRoutes = !event.node.req.url?.startsWith("/api");
  if (!clientSideRoutes) {
    const session = await getServerSession(event);
    if (!session && !event.node.req.url?.startsWith("/api/auth")) {
      sendError(
        event,
        new Error("Vous devez être connecté pour accéder à cette ressource.")
      );
    }
  }
});
