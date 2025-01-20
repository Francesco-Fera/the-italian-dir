export const getStatusElements = (status: string | undefined) => {
  if (!status) {
    return { color: "gray", text: "Sconosciuto" };
  }
  const statusColorMap: Record<string, { color: string; text: string }> = {
    PENDING: { color: "yellow", text: "In attesa" },
    APPROVED: { color: "green", text: "Online" },
    REJECTED: { color: "red", text: "Rifiutata" },
  };
  return statusColorMap[status];
};
