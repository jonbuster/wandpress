import * as React from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { CheckboxField } from '../components/ui/checkbox'
import { RadioGroup, RadioField } from '../components/ui/radio-group'
import { SwitchField } from '../components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { useToast } from '../components/ui/toast'

export function SettingsScreenTemplate() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        variant: 'success',
        title: 'Settings saved.',
        description: 'All configuration options have been updated.',
      })
    }, 400)
  }

  return (
    <div className="bg-white border border-wp-border rounded shadow-sm overflow-hidden">
      <div className="p-5 pb-0 border-b border-wp-border-light">
        <h2 className="text-[20px] font-bold text-wp-text mb-4">Settings</h2>

        <Tabs defaultValue="general">
          <TabsList className="-mb-px">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="permalinks">Permalinks</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSave}>
            {/* General Settings Tab */}
            <TabsContent value="general" className="p-6 space-y-6">
              {/* Site Title */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Site Title <span className="text-wp-danger">*</span>
                </label>
                <div className="sm:col-span-3 max-w-md">
                  <Input defaultValue="WandPress Studio" />
                </div>
              </div>

              {/* Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Tagline
                </label>
                <div className="sm:col-span-3 max-w-md">
                  <Input defaultValue="Just another WordPress admin interface" />
                  <p className="text-[12px] text-wp-muted mt-1">
                    In a few words, explain what this site is about.
                  </p>
                </div>
              </div>

              {/* WordPress Address */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  WordPress Address (URL)
                </label>
                <div className="sm:col-span-3 max-w-md">
                  <Input defaultValue="https://wandpress.local" />
                </div>
              </div>

              {/* Site Address */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Site Address (URL)
                </label>
                <div className="sm:col-span-3 max-w-md">
                  <Input defaultValue="https://wandpress.local" />
                </div>
              </div>

              {/* Admin Email */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Administration Email
                </label>
                <div className="sm:col-span-3 max-w-md">
                  <Input type="email" defaultValue="admin@wandpress.local" />
                  <p className="text-[12px] text-wp-muted mt-1">
                    This address is used for admin purposes, such as new user notifications.
                  </p>
                </div>
              </div>

              {/* Membership */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Membership
                </label>
                <div className="sm:col-span-3">
                  <CheckboxField
                    id="set-membership"
                    label="Anyone can register"
                    defaultChecked={false}
                  />
                </div>
              </div>

              {/* New User Default Role */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  New User Default Role
                </label>
                <div className="sm:col-span-3 max-w-xs">
                  <Select defaultValue="subscriber">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Site Language */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Site Language
                </label>
                <div className="sm:col-span-3 max-w-xs">
                  <Select defaultValue="en_US">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en_US">English (United States)</SelectItem>
                      <SelectItem value="es_ES">Español</SelectItem>
                      <SelectItem value="fr_FR">Français</SelectItem>
                      <SelectItem value="de_DE">Deutsch</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Timezone
                </label>
                <div className="sm:col-span-3 max-w-xs">
                  <Select defaultValue="utc8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc0">UTC +0</SelectItem>
                      <SelectItem value="utc8">UTC +8 (Singapore / Manila)</SelectItem>
                      <SelectItem value="america_ny">America / New York</SelectItem>
                      <SelectItem value="europe_london">Europe / London</SelectItem>
                      <SelectItem value="asia_tokyo">Asia / Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[12px] text-wp-muted mt-1">
                    Universal time is 2026-09-09 12:15:00.
                  </p>
                </div>
              </div>

              {/* Date Format */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-start">
                <label className="text-[13px] font-semibold text-wp-text pt-0.5">
                  Date Format
                </label>
                <div className="sm:col-span-3">
                  <RadioGroup defaultValue="df1" className="space-y-2">
                    <RadioField id="df1" value="df1" label="September 9, 2026 (F j, Y)" />
                    <RadioField id="df2" value="df2" label="2026-09-09 (Y-m-d)" />
                    <RadioField id="df3" value="df3" label="09/09/2026 (m/d/Y)" />
                    <RadioField id="df4" value="df4" label="09/09/2026 (d/m/Y)" />
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            {/* Writing Tab */}
            <TabsContent value="writing" className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Default Post Category
                </label>
                <div className="sm:col-span-3 max-w-xs">
                  <Select defaultValue="uncategorized">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uncategorized">Uncategorized</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Default Post Format
                </label>
                <div className="sm:col-span-3 max-w-xs">
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="aside">Aside</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Reading Tab */}
            <TabsContent value="reading" className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-start">
                <label className="text-[13px] font-semibold text-wp-text pt-0.5">
                  Your homepage displays
                </label>
                <div className="sm:col-span-3">
                  <RadioGroup defaultValue="latest" className="space-y-2">
                    <RadioField id="hp-latest" value="latest" label="Your latest posts" />
                    <RadioField id="hp-static" value="static" label="A static page (select below)" />
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-baseline">
                <label className="text-[13px] font-semibold text-wp-text">
                  Blog pages show at most
                </label>
                <div className="sm:col-span-3 flex items-center gap-2 max-w-xs">
                  <Input type="number" defaultValue="10" className="w-20" inputSize="sm" />
                  <span className="text-[13px] text-wp-muted">posts</span>
                </div>
              </div>
            </TabsContent>

            {/* Discussion Tab */}
            <TabsContent value="discussion" className="p-6 space-y-5">
              <h3 className="text-[14px] font-bold text-wp-text pb-2 border-b border-wp-border-light">
                Default post settings
              </h3>
              <div className="space-y-4 max-w-xl">
                <SwitchField
                  id="sw-notify"
                  label="Attempt to notify any blogs linked to from the post"
                  description="Sends pingbacks to other websites referenced in your post."
                />
                <SwitchField
                  id="sw-pingbacks"
                  label="Allow link notifications from other blogs (pingbacks and trackbacks)"
                  defaultChecked
                />
                <SwitchField
                  id="sw-comments"
                  label="Allow people to submit comments on new posts"
                  description="Individual articles can override this setting."
                  defaultChecked
                />
              </div>

              <h3 className="text-[14px] font-bold text-wp-text pb-2 pt-4 border-b border-wp-border-light">
                Other comment settings
              </h3>
              <div className="space-y-4 max-w-xl">
                <SwitchField
                  id="sw-req-name"
                  label="Comment author must fill out name and email"
                  defaultChecked
                />
                <SwitchField
                  id="sw-req-login"
                  label="Users must be registered and logged in to comment"
                />
                <SwitchField
                  id="sw-email-me"
                  label="Email me whenever anyone posts a comment"
                  defaultChecked
                />
              </div>
            </TabsContent>

            {/* Permalinks Tab */}
            <TabsContent value="permalinks" className="p-6 space-y-6">
              <h3 className="text-[14px] font-bold text-wp-text pb-2 border-b border-wp-border-light">
                Common Settings
              </h3>
              <RadioGroup defaultValue="postname" className="space-y-3">
                <RadioField
                  id="pm-plain"
                  value="plain"
                  label="Plain"
                  description="https://wandpress.local/?p=123"
                />
                <RadioField
                  id="pm-day"
                  value="day"
                  label="Day and name"
                  description="https://wandpress.local/2026/09/09/sample-post/"
                />
                <RadioField
                  id="pm-month"
                  value="month"
                  label="Month and name"
                  description="https://wandpress.local/2026/09/sample-post/"
                />
                <RadioField
                  id="pm-postname"
                  value="postname"
                  label="Post name"
                  description="https://wandpress.local/sample-post/"
                />
              </RadioGroup>
            </TabsContent>

            {/* Save Changes Footer Bar */}
            <div className="px-6 py-4 bg-wp-surface-alt border-t border-wp-border-light flex items-center justify-between">
              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save Changes'}
              </Button>
              <span className="text-[12px] text-wp-muted">
                All settings are stored in the active options database.
              </span>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  )
}
