// lib/telecrm.ts
export class TeleCRMService {
  private static apiUrl = process.env.TELECRM_API_URL!;
  private static apiKey = process.env.TELECRM_API_KEY!;

  static async updateLeadStatus(leadId: string, status: string) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          lead_id: leadId,
          status: status
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating TeleCRM lead status:', error);
      return false;
    }
  }

  static async getLead(leadId: string) {
    try {
      const response = await fetch(`${this.apiUrl}/${leadId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching TeleCRM lead:', error);
      return null;
    }
  }
}