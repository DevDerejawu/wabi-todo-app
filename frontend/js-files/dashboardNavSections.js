import { sidebarEndpoints } from "./endpoints.js";

export const baseUrl = "http://localhost:4000";

export async function getTaskStatistics(endpoint) {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      credentials: "include",
    });

    const response = await res.json();

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch task stats");
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function getDashboardNavSection(data) {
  return [
    { text: "Total Numbers of all Tasks.", quantity: data.total },
    { text: "Total numbers of Completed tasks.", quantity: data.completed },
    { text: "Total numbers of Pending tasks.", quantity: data.pending },
    { text: "Total numbers of In Progress tasks.", quantity: data.inProgress },
    { text: "Total number of High Priority tasks.", quantity: data.high },
    { text: "Total number of Medium Priority tasks.", quantity: data.medium },
    { text: "Total number of Low Priority tasks.", quantity: data.low },
  ];
}

export function renderSidebarNavlinks(sideBarLinks) {
  const sideBarTexts = Object.keys(sidebarEndpoints);
  sideBarLinks.innerHTML = sideBarTexts
    .map(
      (text) =>
        `<li${text === "Dashboard" ? ' class="active"' : ""}>${text}</li>`
    )
    .join("");
}
