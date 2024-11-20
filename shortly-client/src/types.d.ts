export interface LinkData {
    id: string
    originalUrl: string
    shortUrl: string
    createdAt: Date
    clicks: number
    qrCode: string
}
export interface UserData {
    id: string
    firstName: string
    lastName: string
    email: string
}
export interface SessionData {
    id: string
    userId: string
    token: string
    expiresAt: Date
}
export interface AnalyticsData {
    id: string
    linkId: string
    ipAddress: string
    userAgent: string
    createdAt: Date
}
export type QrCodeData = Omit<LinkData, 'clicks' | 'originalUrl' | 'shortUrl'>