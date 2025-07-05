"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import { adminSettingsApi } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"

interface Settings {
  companyName?: string
  supportEmail?: string
  supportPhone?: string
  businessAddress?: string
  maintenanceMode?: boolean
  appName?: string
  appVersion?: string
  maxBookingsPerDay?: number
  cancellationTimeLimit?: number
  defaultCommissionRate?: number
}

interface PricingSettings {
  baseFare?: number
  perKmRate?: number
  perMinuteRate?: number
  minimumFare?: number
  cancellationFee?: number
  commissionRate?: number
  peakHourMultiplier?: number
  nightChargeMultiplier?: number
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [pricingSettings, setPricingSettings] = useState<PricingSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  // Fetch settings from backend
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const [settingsResponse, pricingResponse] = await Promise.all([
        adminSettingsApi.getSettings(),
        adminSettingsApi.getPricingSettings()
      ])

      if (settingsResponse.success) {
        setSettings(settingsResponse.data || {})
      }
      if (pricingResponse.success) {
        setPricingSettings(pricingResponse.data || {})
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const saveGeneralSettings = async () => {
    try {
      setSaving(true)
      const response = await adminSettingsApi.updateSettings(settings)
      
      if (response.success) {
        toast({
          title: "Success",
          description: "General settings saved successfully"
        })
      } else {
        throw new Error(response.message || 'Failed to save settings')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const savePricingSettings = async () => {
    try {
      setSaving(true)
      const response = await adminSettingsApi.updatePricingSettings(pricingSettings)
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Pricing settings saved successfully"
        })
      } else {
        throw new Error(response.message || 'Failed to save pricing settings')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save pricing settings",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updatePricingSetting = (key: keyof PricingSettings, value: any) => {
    setPricingSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general settings for your transportation service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input 
                  id="company-name" 
                  value={settings.companyName || ""} 
                  onChange={(e) => updateSetting('companyName', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input 
                  id="support-email" 
                  type="email" 
                  value={settings.supportEmail || ""} 
                  onChange={(e) => updateSetting('supportEmail', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input 
                  id="support-phone" 
                  value={settings.supportPhone || ""} 
                  onChange={(e) => updateSetting('supportPhone', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea 
                  id="address" 
                  value={settings.businessAddress || ""} 
                  onChange={(e) => updateSetting('businessAddress', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="maintenance-mode" 
                  checked={settings.maintenanceMode || false}
                  onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-bookings">Max Bookings Per Day</Label>
                <Input 
                  id="max-bookings" 
                  type="number" 
                  value={settings.maxBookingsPerDay || ""} 
                  onChange={(e) => updateSetting('maxBookingsPerDay', parseInt(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cancellation-limit">Cancellation Time Limit (minutes)</Label>
                <Input 
                  id="cancellation-limit" 
                  type="number" 
                  value={settings.cancellationTimeLimit || ""} 
                  onChange={(e) => updateSetting('cancellationTimeLimit', parseInt(e.target.value))}
                />
              </div>
              <Button onClick={saveGeneralSettings} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save General Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Configuration</CardTitle>
              <CardDescription>Set your platform's pricing structure and commission rates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="base-fare">Base Fare ($)</Label>
                  <Input 
                    id="base-fare" 
                    type="number" 
                    step="0.01"
                    value={pricingSettings.baseFare || ""} 
                    onChange={(e) => updatePricingSetting('baseFare', parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="per-km-rate">Per Km Rate ($)</Label>
                  <Input 
                    id="per-km-rate" 
                    type="number" 
                    step="0.01"
                    value={pricingSettings.perKmRate || ""} 
                    onChange={(e) => updatePricingSetting('perKmRate', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="per-minute-rate">Per Minute Rate ($)</Label>
                  <Input 
                    id="per-minute-rate" 
                    type="number" 
                    step="0.01"
                    value={pricingSettings.perMinuteRate || ""} 
                    onChange={(e) => updatePricingSetting('perMinuteRate', parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minimum-fare">Minimum Fare ($)</Label>
                  <Input 
                    id="minimum-fare" 
                    type="number" 
                    step="0.01"
                    value={pricingSettings.minimumFare || ""} 
                    onChange={(e) => updatePricingSetting('minimumFare', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input 
                    id="commission-rate" 
                    type="number" 
                    step="0.1"
                    value={pricingSettings.commissionRate || ""} 
                    onChange={(e) => updatePricingSetting('commissionRate', parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cancellation-fee">Cancellation Fee ($)</Label>
                  <Input 
                    id="cancellation-fee" 
                    type="number" 
                    step="0.01"
                    value={pricingSettings.cancellationFee || ""} 
                    onChange={(e) => updatePricingSetting('cancellationFee', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="peak-multiplier">Peak Hour Multiplier</Label>
                  <Input 
                    id="peak-multiplier" 
                    type="number" 
                    step="0.1"
                    value={pricingSettings.peakHourMultiplier || ""} 
                    onChange={(e) => updatePricingSetting('peakHourMultiplier', parseFloat(e.target.value))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="night-multiplier">Night Charge Multiplier</Label>
                  <Input 
                    id="night-multiplier" 
                    type="number" 
                    step="0.1"
                    value={pricingSettings.nightChargeMultiplier || ""} 
                    onChange={(e) => updatePricingSetting('nightChargeMultiplier', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <Button onClick={savePricingSettings} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Pricing Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification preferences and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Notification settings are managed through the Notifications page.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API keys and external service integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                API configuration will be available in a future update.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
