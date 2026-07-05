// fetch all tickets for a project
export const fetchTickets = async (projectId: number) => {
  const res = await fetch(`/api/projects/${projectId}/tickets`)
  return res.json()
}

// create a new ticket
export const createTicket = async (data: {
  title: string
  description: string
  status: string
  project_id: number
}) => {
  const res = await fetch(`/api/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

// update ticket status (for drag and drop)
export const updateTicketStatus = async (ticketId: number, status: string) => {
  const res = await fetch(`/api/tickets/${ticketId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  return res.json()
}

// delete a ticket
export const deleteTicket = async (ticketId: number) => {
  const res = await fetch(`/api/tickets/${ticketId}`, {
    method: 'DELETE'
  })
  return res.json()
}