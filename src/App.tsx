import { useState, useEffect } from 'react'
import {
  Pen, LayoutDashboard, Settings, Users, FileText,
  MessageSquare, Activity, Newspaper, Globe, Copy, Check,
  Zap, Shield, Palette, Type, MoreHorizontal, Edit, Trash2,
  ExternalLink, Star, Download, ChevronDown, ChevronRight, Bell,
  HelpCircle, FolderOpen, SlidersHorizontal, Filter, Search, Plus,
  PanelRight, CheckSquare, UploadCloud, Command as CommandIcon, Layers,
  Sparkles,
} from 'lucide-react'

import { LLM_TXT } from './llm-txt'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Alert } from './components/ui/alert'
import { Avatar } from './components/ui/avatar'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { CardAccordion, Card, CardHeader, CardTitle, CardContent, CardFooter, CardControls } from './components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from './components/ui/dialog'
import { Table, TableWrapper, TableHeader, TableBody, TableRow, TableHead, TableCell } from './components/ui/table'
import { Topbar, TopbarBrand, TopbarNav, TopbarLink, TopbarRight } from './components/ui/topbar'
import { Sidebar, SidebarSection, NavItem, NavLink, NavBadge, NavDivider } from './components/ui/sidebar'
import { WelcomeBanner } from './components/ui/welcome-banner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuCheckboxItem } from './components/ui/dropdown-menu'
import { SwitchField } from './components/ui/switch'
import { Spinner, Skeleton } from './components/ui/spinner'
import { Pagination } from './components/ui/pagination'
import { useToast } from './components/ui/toast'
import { Tooltip, TooltipTrigger, TooltipContent } from './components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover'
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from './components/ui/select'
import { SearchInput } from './components/ui/search-input'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from './components/ui/breadcrumb'
import { Progress } from './components/ui/progress'
import { EmptyState } from './components/ui/empty-state'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './components/ui/sheet'
import { Checkbox, CheckboxField } from './components/ui/checkbox'
import { RadioGroup, RadioField } from './components/ui/radio-group'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion'
import { MediaUploader } from './components/ui/media-uploader'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from './components/ui/command'
import { PostsTableTemplate } from './templates/posts-table-template'
import { SettingsScreenTemplate } from './templates/settings-screen-template'

/* ---- Code block with copy button ---- */
function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group rounded-md overflow-hidden border border-wp-border-light bg-[#1d2327] text-white text-[12px] font-mono">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5">
        <span className="text-white/50 text-[11px]">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-[11px]"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap"><code className="font-mono text-[12px]">{code}</code></pre>
    </div>
  )
}

/* ---- Section heading ---- */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[20px] font-bold text-wp-text mb-1 mt-10 flex items-center gap-2 scroll-mt-16"
    >
      <a href={`#${id}`} className="text-wp-border hover:text-wp-muted no-underline">#</a>
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[14px] font-semibold text-wp-text mt-6 mb-2">{children}</h3>
}

function Divider() {
  return <hr className="border-wp-border-light my-8" />
}

/* ---- Live demo + code side by side ---- */
function Demo({ preview, code }: { preview: React.ReactNode; code: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="rounded-md border border-wp-border bg-wp-bg p-4 flex flex-wrap items-start gap-3">
        {preview}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

/* ---- Toast demo (needs hook, so it's its own component) ---- */
function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
      {([ 'success', 'warning', 'error', 'info' ] as const).map((v) => (
        <Button
          key={v}
          variant="secondary"
          onClick={() => toast({
            variant: v,
            title: v === 'success' ? 'Settings saved.' : v === 'warning' ? 'Heads up!' : v === 'error' ? 'Error occurred.' : 'Just so you know.',
            description: v === 'success' ? 'Your changes have been applied.' : v === 'warning' ? 'This action may have side effects.' : v === 'error' ? 'Could not connect to the server.' : 'A new update is available.',
          })}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)} toast
        </Button>
      ))}
    </div>
  )
}

/* ---- Pagination demo (needs local state) ---- */
function PaginationDemo() {
  const [page, setPage] = useState(1)
  return (
    <Card className="mb-6">
      <CardContent className="py-5 space-y-4">
        <Pagination currentPage={page} totalPages={24} onPageChange={setPage} />
        <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
      </CardContent>
    </Card>
  )
}

/* ================================================================
   APP
   ================================================================ */
export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [commandOpen, setCommandOpen] = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedLlm, setCopiedLlm] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div className="min-h-screen bg-wp-bg">

      {/* ---- Topbar ---- */}
      <Topbar>
        <TopbarBrand href="#">
          <div className="w-5 h-5 bg-wp-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-[11px]">W</span>
          </div>
          WandPress
        </TopbarBrand>
        <TopbarNav>
          {[
            { label: 'Overview', href: '#dashboard' },
            { label: 'Posts Template', href: '#template-posts' },
            { label: 'Settings Template', href: '#template-settings' },
            { label: 'Components', href: '#components' },
            { label: 'Theming', href: '#theming' },
            { label: 'Installation', href: '#installation' },
            { label: 'llm.txt', href: '#llm-txt' },
          ].map((item) => (
            <TopbarLink key={item.label} href={item.href} active={activeNav === item.href.slice(1)}>
              {item.label}
            </TopbarLink>
          ))}
        </TopbarNav>
        <TopbarRight>
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-[#a7aaad] bg-white/10 hover:bg-white/20 hover:text-white rounded transition-colors mr-2 cursor-pointer border-none select-none"
            title="Search command palette (⌘K)"
          >
            <Search size={12} />
            <span>Quick search...</span>
            <kbd className="bg-black/30 px-1 py-0.2 rounded text-[10px] font-mono">⌘K</kbd>
          </button>
          <TopbarLink
            href="https://github.com/jonbuster/wandpress"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 mr-1"
          >
            <Globe size={13} />
            <span>GitHub ↗</span>
          </TopbarLink>
        </TopbarRight>
      </Topbar>

      {/* ---- Sidebar ---- */}
      <Sidebar>
        <SidebarSection>
          {[
            { id: 'templates',         label: 'Templates',        icon: <LayoutDashboard size={16} /> },
            { id: 'template-posts',    label: 'Posts Table',      icon: <FileText size={16} /> },
            { id: 'template-settings', label: 'Settings Screen',  icon: <Settings size={16} /> },
            { id: 'components',        label: 'Components',       icon: <Zap size={16} /> },
          ].map(({ id, label, icon }) => (
            <NavItem key={id}>
              <NavLink
                href={`#${id}`}
                active={activeNav === id}
                onClick={() => setActiveNav(id)}
              >
                {icon}
                {label}
              </NavLink>
            </NavItem>
          ))}
          <NavDivider />
          {[
            { id: 'card',        label: 'Card',        icon: <FileText size={16} /> },
            { id: 'button',      label: 'Button',      icon: <Activity size={16} /> },
            { id: 'badge',       label: 'Badge',       icon: <Shield size={16} /> },
            { id: 'avatar',      label: 'Avatar',      icon: <Users size={16} /> },
            { id: 'alert',       label: 'Alert',       icon: <MessageSquare size={16} /> },
            { id: 'dialog',      label: 'Dialog',      icon: <Globe size={16} /> },
            { id: 'sheet',       label: 'Sheet / Drawer', icon: <PanelRight size={16} /> },
            { id: 'tabs',        label: 'Tabs',        icon: <LayoutDashboard size={16} /> },
            { id: 'dropdown',    label: 'Dropdown',    icon: <ChevronDown size={16} /> },
            { id: 'toast',       label: 'Toast',       icon: <Bell size={16} /> },
            { id: 'switch',      label: 'Switch',      icon: <Zap size={16} /> },
            { id: 'checkbox',    label: 'Checkbox / Radio', icon: <CheckSquare size={16} /> },
            { id: 'spinner',     label: 'Spinner',     icon: <Star size={16} /> },
            { id: 'pagination',  label: 'Pagination',  icon: <MoreHorizontal size={16} /> },
            { id: 'tooltip',     label: 'Tooltip',     icon: <HelpCircle size={16} /> },
            { id: 'popover',     label: 'Popover',     icon: <SlidersHorizontal size={16} /> },
            { id: 'select',      label: 'Select',      icon: <Filter size={16} /> },
            { id: 'search',      label: 'Search',      icon: <Search size={16} /> },
            { id: 'breadcrumb',  label: 'Breadcrumb',  icon: <ChevronRight size={16} /> },
            { id: 'progress',    label: 'Progress',    icon: <Activity size={16} /> },
            { id: 'empty-state', label: 'Empty State', icon: <FolderOpen size={16} /> },
            { id: 'accordion',   label: 'Accordion',   icon: <Layers size={16} /> },
            { id: 'media',       label: 'Media Upload', icon: <UploadCloud size={16} /> },
            { id: 'command',     label: 'Command (⌘K)', icon: <CommandIcon size={16} /> },
            { id: 'form',        label: 'Form',        icon: <Pen size={16} /> },
            { id: 'table',       label: 'Table',       icon: <Newspaper size={16} /> },
            { id: 'nav',         label: 'Nav',         icon: <Users size={16} /> },
            { id: 'typography',  label: 'Typography',  icon: <Type size={16} /> },
            { id: 'theming',     label: 'Theming',     icon: <Palette size={16} /> },
            { id: 'installation',label: 'Installation',icon: <Download size={16} /> },
            { id: 'llm-txt',     label: 'llm.txt (AI)',icon: <Sparkles size={16} /> },
          ].map(({ id, label, icon }) => (
            <NavItem key={id}>
              <NavLink href={`#${id}`} active={activeNav === id} onClick={() => setActiveNav(id)}>
                {icon}
                {label}
                {id === 'badge' && <NavBadge>3</NavBadge>}
              </NavLink>
            </NavItem>
          ))}
          <NavDivider />
          <NavItem>
            <NavLink href="#" active={false}>
              <Settings size={16} />
              Settings
            </NavLink>
          </NavItem>
        </SidebarSection>
      </Sidebar>

      {/* ---- Page Content ---- */}
      <div className="pt-8 pl-40 min-h-screen">
        <div className="max-w-5xl px-6 py-6">

          {/* ================================================================
              DASHBOARD DEMO
              ================================================================ */}
          <div id="dashboard">
            <h1 className="text-[22px] font-bold text-wp-text mb-1">WandPress</h1>
            <p className="text-wp-muted mb-6 text-[13px]">
              A WordPress admin-inspired React + shadcn/ui component library.
              Drop in components that look and feel like the WP dashboard — with proper accessibility, animations, and TypeScript support.
            </p>

            {/* Welcome Banner */}
            <WelcomeBanner
              heading="Welcome to WandPress!"
              subheading={
                <div className="space-y-3 mt-2">
                  <p className="text-[13px] text-white/80">
                    A WordPress admin design system for React. Built with Radix UI, Tailwind CSS, and TypeScript.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {/* Copyable npm install command */}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('npm install wandpress')
                        setCopiedInstall(true)
                        setTimeout(() => setCopiedInstall(false), 2000)
                      }}
                      className="inline-flex items-center gap-2 h-8 px-3 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-white text-[12px] font-mono transition-colors cursor-pointer select-none"
                      title="Click to copy command"
                    >
                      <span className="text-white/40">$</span>
                      <span className="text-emerald-300 font-medium">npm install wandpress</span>
                      {copiedInstall ? (
                        <Check size={13} className="text-emerald-400 ml-1" />
                      ) : (
                        <Copy size={13} className="text-white/40 hover:text-white ml-1 transition-colors" />
                      )}
                    </button>

                    {/* npmjs button using framework Button component */}
                    <Button asChild variant="primary" size="default">
                      <a
                        href="https://www.npmjs.com/package/wandpress"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download size={14} />
                        <span>npm v1.0.2</span>
                        <ExternalLink size={12} className="opacity-70" />
                      </a>
                    </Button>

                    {/* GitHub repo button using framework Button component */}
                    <Button asChild variant="secondary" size="default">
                      <a
                        href="https://github.com/jonbuster/wandpress"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Globe size={14} />
                        <span>GitHub Repo</span>
                        <ExternalLink size={12} className="opacity-70" />
                      </a>
                    </Button>

                    <a href="#installation" className="text-[12px] text-white/75 hover:text-white underline ml-1 transition-colors">
                      Installation Guide →
                    </a>
                    <span className="text-white/30">·</span>
                    <a href="#llm-txt" className="text-[12px] text-white/75 hover:text-white underline transition-colors">
                      llm.txt (AI Prompt) →
                    </a>
                  </div>
                </div>
              }
              onDismiss={() => {}}
              features={[
                {
                  icon: <Zap size={18} />,
                  title: 'Install via npm',
                  description: 'Ready to import in any React or Next.js app with pre-compiled CSS and dual ESM/CJS bundles.',
                  link: { href: 'https://www.npmjs.com/package/wandpress', label: 'View on npmjs.com ↗' },
                },
                {
                  icon: <LayoutDashboard size={18} />,
                  title: 'Full Admin Templates',
                  description: 'Production-ready Posts Table with quick-edit and a tabbed Settings Screen interface.',
                  link: { href: '#templates', label: 'Explore templates' },
                },
                {
                  icon: <Globe size={18} />,
                  title: 'Open Source (MIT)',
                  description: 'Public repository hosted on GitHub. Free for personal and commercial applications.',
                  link: { href: 'https://github.com/jonbuster/wandpress', label: 'View GitHub repo ↗' },
                },
              ]}
            />

            {/* Full Admin Page Templates */}
            <div id="templates" className="mt-8 space-y-10 scroll-mt-14">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-wp-primary text-white">
                    Page Template 1
                  </span>
                  <h2 id="template-posts" className="text-[20px] font-bold text-wp-text scroll-mt-16">
                    Posts List View
                  </h2>
                </div>
                <p className="text-[13px] text-wp-muted mb-4">
                  Complete interactive WordPress post management table with status filtering tabs, bulk actions selector, date &amp; category dropdowns, live search, hover quick-actions, inline Quick-Edit row, and bottom pagination.
                </p>
                <PostsTableTemplate />
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-2 pt-6 border-t border-wp-border-light">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-wp-primary text-white">
                    Page Template 2
                  </span>
                  <h2 id="template-settings" className="text-[20px] font-bold text-wp-text scroll-mt-16">
                    Settings Screen
                  </h2>
                </div>
                <p className="text-[13px] text-wp-muted mb-4">
                  Full WordPress administration settings interface with tabbed views (General, Writing, Reading, Discussion, Permalinks), form inputs, role selects, radio groups, comment switch toggles, and toast notifications on save.
                </p>
                <SettingsScreenTemplate />
              </div>
            </div>
          </div>

          <Divider />

          {/* ================================================================
              COMPONENTS DOCS
              ================================================================ */}
          <div id="components">
            {/* ---- Card / Accordion ---- */}
            <SectionHeading id="card">Card</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              The core layout unit. Use <code className="bg-wp-surface-alt px-1 rounded text-wp-text">CardAccordion</code> for collapsible panels powered by Radix UI Collapsible — keyboard accessible, animated, no height hacks.
            </p>

            <SubHeading>CardAccordion (collapsible)</SubHeading>
            <Demo
              preview={
                <CardAccordion title="Site Health Status" className="w-full mb-0">
                  <CardContent>
                    <p>Your site's health is looking good.</p>
                  </CardContent>
                </CardAccordion>
              }
              code={`import { CardAccordion, CardContent } from '@/components/ui/card'

<CardAccordion title="Site Health Status" defaultOpen={true}>
  <CardContent>
    <p>Your site's health is looking good.</p>
  </CardContent>
</CardAccordion>`}
            />

            <SubHeading>Static Card</SubHeading>
            <Demo
              preview={
                <Card className="w-full mb-0">
                  <CardHeader>
                    <CardTitle>At a Glance</CardTitle>
                    <CardControls>
                      <Button variant="primary" size="sm">Add New</Button>
                    </CardControls>
                  </CardHeader>
                  <CardContent>Content goes here.</CardContent>
                  <CardFooter>WordPress 7.1 running GeneratePress theme.</CardFooter>
                </Card>
              }
              code={`import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>At a Glance</CardTitle>
    <CardControls>
      <Button variant="primary" size="sm">Add New</Button>
    </CardControls>
  </CardHeader>
  <CardContent>Content goes here.</CardContent>
  <CardFooter>WordPress 7.1 running GeneratePress theme.</CardFooter>
</Card>`}
            />

            <Divider />

            {/* ---- Button ---- */}
            <SectionHeading id="button">Button</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Five variants, three sizes. All accessible with keyboard focus rings.
            </p>
            <Demo
              preview={
                <>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="link">Link</Button>
                </>
              }
              code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>`}
            />
            <Demo
              preview={
                <>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="default">Default</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </>
              }
              code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>`}
            />

            <Divider />

            {/* ---- Badge ---- */}
            <SectionHeading id="badge">Badge</SectionHeading>
            <Demo
              preview={
                <>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Published</Badge>
                  <Badge variant="warning">Draft</Badge>
                  <Badge variant="danger">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </>
              }
              code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Published</Badge>
<Badge variant="warning">Draft</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Info</Badge>`}
            />

            <Divider />

            {/* ---- Avatar ---- */}
            <SectionHeading id="avatar">Avatar</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              User profile avatars with initials fallback and shape variants (circle, rounded, square).
            </p>
            <Demo
              preview={
                <div className="flex items-center gap-3">
                  <Avatar fallback="A" size="xs" />
                  <Avatar fallback="WP" size="sm" />
                  <Avatar fallback="KR" size="default" />
                  <Avatar fallback="AD" size="lg" shape="rounded" />
                  <Avatar fallback="SU" size="xl" shape="square" />
                </div>
              }
              code={`import { Avatar } from '@/components/ui/avatar'

{/* Sizes: xs | sm | default | lg | xl */}
{/* Shapes: circle | rounded | square */}
<Avatar fallback="KR" size="default" />
<Avatar fallback="AD" size="lg" shape="rounded" />
<Avatar fallback="SU" size="xl" shape="square" />`}
            />

            <Divider />

            {/* ---- Alert ---- */}
            <SectionHeading id="alert">Alert</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              WordPress-style left-border notices. Add <code className="bg-wp-surface-alt px-1 rounded text-wp-text">dismissible</code> prop for a close button.
            </p>
            <div className="mb-6">
              <Alert variant="success" title="Settings saved." dismissible>
                Your changes have been saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning." dismissible>
                Your PHP version is out of date. Please upgrade.
              </Alert>
              <Alert variant="error" title="Error." dismissible>
                Could not connect to the database.
              </Alert>
              <Alert variant="info" title="Update available." dismissible>
                WandPress 2.0 is available. <a href="#">Update now</a>.
              </Alert>
            </div>
            <CodeBlock code={`<Alert variant="success" title="Settings saved." dismissible>
  Your changes have been saved successfully.
</Alert>

<Alert variant="warning" title="Warning." dismissible>
  Your PHP version is out of date.
</Alert>

<Alert variant="error" title="Error." dismissible>
  Could not connect to the database.
</Alert>

<Alert variant="info" title="Update available." dismissible>
  WandPress 2.0 is available. <a href="#">Update now</a>.
</Alert>`} />

            <Divider />

            {/* ---- Dialog ---- */}
            <SectionHeading id="dialog">Dialog (Modal)</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Powered by Radix UI Dialog — focus trapped inside, ESC to close, click outside to close. No JS hacks needed.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="primary">Open Modal</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Post Settings</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[12px] font-medium text-wp-text mb-1">Post Title</label>
                            <Input defaultValue="Hello world!" />
                          </div>
                          <div>
                            <label className="block text-[12px] font-medium text-wp-text mb-1">Notes</label>
                            <Textarea rows={3} placeholder="Internal notes..." />
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button variant="ghost">Cancel</Button>
                        <Button variant="primary">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="danger">Delete</Button>
                    </DialogTrigger>
                    <DialogContent size="sm">
                      <DialogHeader>
                        <DialogTitle>Delete Post?</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <p>Are you sure you want to permanently delete <strong>Hello world!</strong>? This cannot be undone.</p>
                      </DialogBody>
                      <DialogFooter>
                        <Button variant="ghost">Cancel</Button>
                        <Button variant="danger">Yes, Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              }
              code={`import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogBody, DialogFooter
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Open Modal</Button>
  </DialogTrigger>
  <DialogContent size="default"> {/* sm | default | lg | xl */}
    <DialogHeader>
      <DialogTitle>Edit Post Settings</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <Input defaultValue="Hello world!" />
    </DialogBody>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            />

            <Divider />

            {/* ---- Form ---- */}
            <SectionHeading id="form">Form Elements</SectionHeading>
            <Demo
              preview={
                <div className="w-full space-y-3">
                  <div>
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Site Title <span className="text-wp-danger">*</span></label>
                    <Input placeholder="My Website" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Bio</label>
                    <Textarea rows={3} placeholder="Tell us about yourself..." />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="ghost">Reset</Button>
                  </div>
                </div>
              }
              code={`import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

<div>
  <label className="block text-[12px] font-medium mb-1">
    Site Title <span className="text-wp-danger">*</span>
  </label>
  <Input placeholder="My Website" />
</div>

<div>
  <label className="block text-[12px] font-medium mb-1">Bio</label>
  <Textarea rows={3} placeholder="Tell us about yourself..." />
</div>`}
            />

            <Divider />

            {/* ---- Table ---- */}
            <SectionHeading id="table">Table</SectionHeading>
            <CardAccordion title="Recent Posts" defaultOpen={true} className="mb-6">
              <CardContent className="p-0">
                <TableWrapper>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { title: 'Hello world!', author: 'Admin', status: 'success' as const, statusLabel: 'Published', date: 'Sep 5, 2026' },
                        { title: 'My First Draft', author: 'Admin', status: 'warning' as const, statusLabel: 'Draft', date: 'Sep 8, 2026' },
                        { title: 'Getting Started with WandPress', author: 'Editor', status: 'info' as const, statusLabel: 'Pending', date: 'Sep 9, 2026' },
                      ].map((row) => (
                        <TableRow key={row.title}>
                          <TableCell><a href="#" className="text-wp-link hover:text-wp-link-hover">{row.title}</a></TableCell>
                          <TableCell className="text-wp-muted">{row.author}</TableCell>
                          <TableCell><Badge variant={row.status}>{row.statusLabel}</Badge></TableCell>
                          <TableCell className="text-wp-muted">{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </CardContent>
            </CardAccordion>

            <CodeBlock code={`import {
  TableWrapper, Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell
} from '@/components/ui/table'

<TableWrapper>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell><a href="#">Hello world!</a></TableCell>
        <TableCell><Badge variant="success">Published</Badge></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableWrapper>`} />

            <Divider />

            {/* ---- Tabs ---- */}
            <SectionHeading id="tabs">Tabs</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              WordPress-style border-bottom tabs powered by Radix UI — keyboard navigable, ARIA-labelled, animated.
            </p>
            <Demo
              preview={
                <div className="w-full">
                  <Tabs defaultValue="published">
                    <TabsList>
                      <TabsTrigger value="published">Published</TabsTrigger>
                      <TabsTrigger value="drafts">Drafts</TabsTrigger>
                      <TabsTrigger value="trash">Trash</TabsTrigger>
                    </TabsList>
                    <TabsContent value="published">
                      <p className="text-[13px] text-wp-text">Showing <strong>1</strong> published post.</p>
                    </TabsContent>
                    <TabsContent value="drafts">
                      <p className="text-[13px] text-wp-muted">No drafts found.</p>
                    </TabsContent>
                    <TabsContent value="trash">
                      <p className="text-[13px] text-wp-muted">Trash is empty.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              }
              code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="published">
  <TabsList>
    <TabsTrigger value="published">Published</TabsTrigger>
    <TabsTrigger value="drafts">Drafts</TabsTrigger>
    <TabsTrigger value="trash">Trash</TabsTrigger>
  </TabsList>
  <TabsContent value="published">
    Showing 1 published post.
  </TabsContent>
  <TabsContent value="drafts">
    No drafts found.
  </TabsContent>
</Tabs>`}
            />

            <Divider />

            {/* ---- Dropdown Menu ---- */}
            <SectionHeading id="dropdown">Dropdown Menu</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Action menus and context menus powered by Radix UI DropdownMenu — supports sub-menus, checkboxes, radio groups, keyboard navigation.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap gap-3">
                  {/* Standard action menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">
                        Actions <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit size={14} /> Edit
                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download size={14} /> Export
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink size={14} /> View live
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive>
                        <Trash2 size={14} /> Delete
                        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Icon trigger */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="More options">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuCheckboxItem checked>Show comments</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Show revisions</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Show meta</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              }
              code={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions <ChevronDown size={14} /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Edit size={14} /> Edit
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem destructive>
      <Trash2 size={14} /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
            />

            <Divider />

            {/* ---- Toast ---- */}
            <SectionHeading id="toast">Toast</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Temporary notifications that slide in from the bottom-right. Uses <code className="bg-wp-surface-alt px-1 rounded text-wp-text">useToast()</code> hook — wrap your app in <code className="bg-wp-surface-alt px-1 rounded text-wp-text">ToastContextProvider</code> once in <code className="bg-wp-surface-alt px-1 rounded text-wp-text">main.tsx</code>.
            </p>
            <ToastDemo />
            <CodeBlock code={`// main.tsx — wrap once
import { ToastContextProvider } from '@/components/ui/toast'

<ToastContextProvider>
  <App />
</ToastContextProvider>

// Any component — call the hook
import { useToast } from '@/components/ui/toast'

function MyComponent() {
  const { toast } = useToast()

  return (
    <Button onClick={() => toast({
      variant: 'success',
      title: 'Settings saved.',
      description: 'Your changes have been applied.',
    })}>
      Save
    </Button>
  )
}`} />

            <Divider />

            {/* ---- Switch ---- */}
            <SectionHeading id="switch">Switch / Toggle</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Accessible toggle switches powered by Radix UI Switch. Use the bare <code className="bg-wp-surface-alt px-1 rounded text-wp-text">Switch</code> or the convenience <code className="bg-wp-surface-alt px-1 rounded text-wp-text">SwitchField</code> wrapper for labelled settings rows.
            </p>
            <Demo
              preview={
                <div className="w-full space-y-4">
                  <SwitchField
                    id="comments"
                    label="Allow comments"
                    description="Readers can leave comments on new posts."
                    defaultChecked
                  />
                  <SwitchField
                    id="pingbacks"
                    label="Allow pingbacks & trackbacks"
                    description="Notify linked sites when you publish a post."
                  />
                  <SwitchField
                    id="maintenance"
                    label="Maintenance mode"
                    description="Show a coming-soon page to visitors."
                    disabled
                  />
                </div>
              }
              code={`import { Switch, SwitchField } from '@/components/ui/switch'

{/* Labelled setting row */}
<SwitchField
  id="comments"
  label="Allow comments"
  description="Readers can leave comments on new posts."
  defaultChecked
/>

{/* Bare switch */}
<Switch id="my-toggle" checked={value} onCheckedChange={setValue} />`}
            />

            <Divider />

            {/* ---- Spinner & Skeleton ---- */}
            <SectionHeading id="spinner">Spinner &amp; Skeleton</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Loading state primitives. <code className="bg-wp-surface-alt px-1 rounded text-wp-text">Spinner</code> for action feedback, <code className="bg-wp-surface-alt px-1 rounded text-wp-text">Skeleton</code> for content placeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader><CardTitle>Spinner</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap items-center gap-5">
                  <div className="text-center space-y-1">
                    <Spinner size="xs" />
                    <p className="text-[11px] text-wp-muted">xs</p>
                  </div>
                  <div className="text-center space-y-1">
                    <Spinner size="sm" />
                    <p className="text-[11px] text-wp-muted">sm</p>
                  </div>
                  <div className="text-center space-y-1">
                    <Spinner size="default" />
                    <p className="text-[11px] text-wp-muted">default</p>
                  </div>
                  <div className="text-center space-y-1">
                    <Spinner size="lg" />
                    <p className="text-[11px] text-wp-muted">lg</p>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="w-10 h-10 bg-wp-dark rounded flex items-center justify-center">
                      <Spinner size="default" color="white" />
                    </div>
                    <p className="text-[11px] text-wp-muted">white</p>
                  </div>
                  <div className="mt-3 w-full">
                    <Button variant="primary" disabled className="gap-2">
                      <Spinner size="sm" color="white" /> Saving…
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Skeleton</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circle" width="40px" height="40px" />
                    <Skeleton variant="text" lines={2} className="flex-1" />
                  </div>
                  <Skeleton variant="rect" height="80px" />
                  <Skeleton variant="text" lines={3} />
                </CardContent>
              </Card>
            </div>
            <CodeBlock code={`import { Spinner, Skeleton } from '@/components/ui/spinner'

{/* Spinner — sizes: xs | sm | default | lg | xl */}
{/* Colors: primary | white | muted */}
<Spinner size="default" color="primary" />

{/* Button loading state */}
<Button disabled>
  <Spinner size="sm" color="white" /> Saving…
</Button>

{/* Skeleton — variants: text | rect | circle */}
<div className="flex items-center gap-3">
  <Skeleton variant="circle" width="40px" height="40px" />
  <Skeleton variant="text" lines={2} className="flex-1" />
</div>
<Skeleton variant="rect" height="120px" />`} />

            <Divider />

            {/* ---- Pagination ---- */}
            <SectionHeading id="pagination">Pagination</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Smart page navigation with ellipsis for large page counts. Fully keyboard accessible.
            </p>
            <PaginationDemo />
            <CodeBlock code={`import { Pagination } from '@/components/ui/pagination'

function PostsTable() {
  const [page, setPage] = useState(1)

  return (
    <>
      {/* table rows... */}
      <Pagination
        currentPage={page}
        totalPages={24}
        onPageChange={setPage}
        siblingCount={1}
      />
    </>
  )
}`} />


            <Divider />

            {/* ---- Tooltip ---- */}
            <SectionHeading id="tooltip">Tooltip</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Accessible hover hints powered by Radix UI Tooltip — ideal for icon buttons, status badges, and abbreviations.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Edit site configurations
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Help">
                        <HelpCircle size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Read the documentation
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="success" className="cursor-help">Live</Badge>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Site is publicly reachable and healthy
                    </TooltipContent>
                  </Tooltip>
                </div>
              }
              code={`import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    Edit site configurations
  </TooltipContent>
</Tooltip>`}
            />

            <Divider />

            {/* ---- Popover ---- */}
            <SectionHeading id="popover">Popover</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Floating panel overlays for rich contextual content, filter bars, and quick actions powered by Radix UI Popover.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">
                        <Filter size={14} /> Filter Posts
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[13px] text-wp-text">Filter Options</h4>
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Author</label>
                          <Input placeholder="Search author..." inputSize="sm" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Status</label>
                          <Select defaultValue="all">
                            <SelectTrigger className="h-7 text-[12px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All statuses</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2 pt-1 border-t border-wp-border-light">
                          <Button variant="ghost" size="sm">Reset</Button>
                          <Button variant="primary" size="sm">Apply</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Info">
                        <HelpCircle size={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="right" className="w-64">
                      <p className="text-[13px] font-semibold text-wp-text mb-1">About WandPress</p>
                      <p className="text-[12px] text-wp-muted leading-relaxed">
                        An admin component system built with Radix primitives and faithful WordPress styles.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
              }
              code={`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary"><Filter size={14} /> Filter</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <h4 className="font-semibold text-[13px] mb-2">Filter Options</h4>
    {/* Form controls */}
  </PopoverContent>
</Popover>`}
            />

            <Divider />

            {/* ---- Select ---- */}
            <SectionHeading id="select">Select (Custom Dropdown)</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Accessible custom select dropdown replacement powered by Radix UI Select — with keyboard navigation, active checkmarks, and scrolling.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap gap-4 w-full">
                  <div className="w-56">
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Post Status</label>
                    <Select defaultValue="published">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending">Pending Review</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="trash">Trash</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-56">
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Category</label>
                    <Select defaultValue="plugins">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">News & Events</SelectItem>
                        <SelectItem value="plugins">Plugins</SelectItem>
                        <SelectItem value="themes">Themes</SelectItem>
                        <SelectItem value="core">Core Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              }
              code={`import {
  Select, SelectGroup, SelectValue, SelectTrigger,
  SelectContent, SelectLabel, SelectItem, SelectSeparator
} from '@/components/ui/select'

<Select defaultValue="published">
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Status</SelectLabel>
      <SelectItem value="published">Published</SelectItem>
      <SelectItem value="draft">Draft</SelectItem>
      <SelectItem value="pending">Pending Review</SelectItem>
      <SelectSeparator />
      <SelectItem value="trash">Trash</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
            />

            <Divider />

            {/* ---- Search Input ---- */}
            <SectionHeading id="search">Search Input</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              WordPress admin search field with integrated search icon and an instant clear button.
            </p>
            <Demo
              preview={
                <div className="w-full space-y-3">
                  <div>
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Default Search</label>
                    <SearchInput placeholder="Search posts, pages, plugins..." />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-wp-text mb-1">Small (Table Filter Bar)</label>
                    <div className="flex items-center gap-2">
                      <SearchInput inputSize="sm" placeholder="Filter items..." defaultValue="WordPress" />
                      <Button variant="secondary" size="sm">Search</Button>
                    </div>
                  </div>
                </div>
              }
              code={`import { SearchInput } from '@/components/ui/search-input'

{/* Default */}
<SearchInput placeholder="Search posts..." />

{/* Compact for table toolbars */}
<SearchInput
  inputSize="sm"
  placeholder="Filter items..."
  onClear={() => console.log('Cleared')}
/>`}
            />

            <Divider />

            {/* ---- Breadcrumb ---- */}
            <SectionHeading id="breadcrumb">Breadcrumb</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Hierarchical path navigation styled for WordPress admin pages.
            </p>
            <Demo
              preview={
                <div className="w-full space-y-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#dashboard">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#table">Posts</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Edit Post #102</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>

                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#nav">Settings</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Permalinks</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              }
              code={`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
} from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Edit Post</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
            />

            <Divider />

            {/* ---- Progress ---- */}
            <SectionHeading id="progress">Progress</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Horizontal progress bar for scores, quotas, and file uploads powered by Radix UI Progress.
            </p>
            <Card className="mb-6">
              <CardContent className="space-y-4 py-5">
                <div>
                  <div className="flex justify-between text-[12px] font-medium text-wp-text mb-1">
                    <span>Site Health Score</span>
                    <span className="text-wp-success font-bold">85% (Good)</span>
                  </div>
                  <Progress value={85} variant="success" />
                </div>

                <div>
                  <div className="flex justify-between text-[12px] font-medium text-wp-text mb-1">
                    <span>Media Storage Quota</span>
                    <span className="text-wp-muted">45% used of 10 GB</span>
                  </div>
                  <Progress value={45} variant="default" />
                </div>

                <div>
                  <div className="flex justify-between text-[12px] font-medium text-wp-text mb-1">
                    <span>Database Optimization Warning</span>
                    <span className="text-wp-warning font-bold">72%</span>
                  </div>
                  <Progress value={72} variant="warning" />
                </div>

                <div>
                  <div className="flex justify-between text-[12px] font-medium text-wp-text mb-1">
                    <span>PHP Memory Critical</span>
                    <span className="text-wp-danger font-bold">94%</span>
                  </div>
                  <Progress value={94} variant="danger" />
                </div>
              </CardContent>
            </Card>
            <CodeBlock code={`import { Progress } from '@/components/ui/progress'

{/* Variants: default | success | warning | danger */}
<Progress value={85} variant="success" />
<Progress value={45} variant="default" />
<Progress value={72} variant="warning" />
<Progress value={94} variant="danger" />`} />

            <Divider />

            {/* ---- Empty State ---- */}
            <SectionHeading id="empty-state">Empty State</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Helpful placeholder cards when lists, search results, or tables have no content to display.
            </p>
            <Demo
              preview={
                <div className="w-full">
                  <EmptyState
                    icon={<FolderOpen size={24} />}
                    title="No media files found"
                    description="Upload your first image, video, or audio file to start populating your media library."
                    action={
                      <Button variant="primary" size="sm">
                        <Plus size={14} /> Upload Media
                      </Button>
                    }
                  />
                </div>
              }
              code={`import { EmptyState } from '@/components/ui/empty-state'
import { FolderOpen, Plus } from 'lucide-react'

<EmptyState
  icon={<FolderOpen size={24} />}
  title="No media files found"
  description="Upload your first image, video, or audio file to start populating your media library."
  action={
    <Button variant="primary" size="sm">
      <Plus size={14} /> Upload Media
    </Button>
  }
/>`}
            />

            <Divider />

            {/* ---- Sheet / Drawer ---- */}
            <SectionHeading id="sheet">Sheet / Slide-over Drawer</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Slide-in modal panels from the right, left, top, or bottom powered by Radix UI. Ideal for quick post editing, preview panels, or mobile navigation.
            </p>
            <Demo
              preview={
                <div className="flex flex-wrap gap-3">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary">
                        <PanelRight size={14} /> Open Right Drawer
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Quick Edit Post</SheetTitle>
                        <SheetDescription>
                          Make quick changes to post metadata without opening the full editor.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 py-4 text-[13px]">
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Post Title</label>
                          <Input defaultValue="Hello world!" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Slug</label>
                          <Input defaultValue="hello-world" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Categories</label>
                          <Select defaultValue="news">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="news">News & Events</SelectItem>
                              <SelectItem value="updates">Updates</SelectItem>
                              <SelectItem value="tutorials">Tutorials</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-[12px] font-medium text-wp-text mb-1">Excerpt</label>
                          <Textarea rows={3} defaultValue="Welcome to WordPress. This is your first post..." />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </SheetClose>
                        <Button variant="primary">Update Post</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost">Left Drawer (Menu)</Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Admin Navigation</SheetTitle>
                        <SheetDescription>Quick navigation for mobile viewports.</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-2 py-4 text-[13px]">
                        <a href="#dashboard" className="block p-2 rounded hover:bg-wp-surface-alt font-medium text-wp-text">Dashboard</a>
                        <a href="#table" className="block p-2 rounded hover:bg-wp-surface-alt font-medium text-wp-text">Posts</a>
                        <a href="#media" className="block p-2 rounded hover:bg-wp-surface-alt font-medium text-wp-text">Media</a>
                        <a href="#nav" className="block p-2 rounded hover:bg-wp-surface-alt font-medium text-wp-text">Settings</a>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              }
              code={`import {
  Sheet, SheetTrigger, SheetContent,
  SheetHeader, SheetTitle, SheetDescription, SheetFooter
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Quick Edit</Button>
  </SheetTrigger>
  <SheetContent side="right"> {/* side: right | left | top | bottom */}
    <SheetHeader>
      <SheetTitle>Quick Edit Post</SheetTitle>
      <SheetDescription>Edit post metadata quickly.</SheetDescription>
    </SheetHeader>
    {/* Drawer form body */}
    <SheetFooter>
      <Button variant="primary">Save Changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
            />

            <Divider />

            {/* ---- Checkbox & Radio Group ---- */}
            <SectionHeading id="checkbox">Checkbox &amp; Radio Group</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Accessible custom checkboxes and radio buttons powered by Radix UI. Styled to match WordPress settings panels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Checkboxes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CheckboxField
                    id="chk-avatars"
                    label="Show Avatars"
                    description="Display avatar images next to user comments."
                    defaultChecked
                  />
                  <CheckboxField
                    id="chk-moderation"
                    label="Comment author must fill out name and email"
                    defaultChecked
                  />
                  <CheckboxField
                    id="chk-login"
                    label="Users must be registered and logged in to comment"
                    description="Reduces spam but requires visitor accounts."
                  />
                  <CheckboxField
                    id="chk-disabled"
                    label="Close comments on articles older than 14 days"
                    disabled
                  />
                  <div className="flex items-center gap-2 pt-2 border-t border-wp-border-light">
                    <Checkbox id="chk-bare" defaultChecked />
                    <label htmlFor="chk-bare" className="text-[12px] text-wp-muted cursor-pointer">
                      Standalone bare Checkbox
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Radio Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard" className="space-y-3">
                    <RadioField
                      id="r-standard"
                      value="standard"
                      label="Standard Post"
                      description="Default blog post format with full title and content."
                    />
                    <RadioField
                      id="r-aside"
                      value="aside"
                      label="Aside / Status"
                      description="Short update without a dedicated title."
                    />
                    <RadioField
                      id="r-gallery"
                      value="gallery"
                      label="Gallery"
                      description="Displays an image grid or carousel at the top."
                    />
                    <RadioField
                      id="r-link"
                      value="link"
                      label="External Link"
                      description="Links directly to an offsite source URL."
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
            <CodeBlock code={`import { CheckboxField } from '@/components/ui/checkbox'
import { RadioGroup, RadioField } from '@/components/ui/radio-group'

{/* Checkbox with label & description */}
<CheckboxField
  id="avatars"
  label="Show Avatars"
  description="Display avatar images next to user comments."
  defaultChecked
/>

{/* Radio Group */}
<RadioGroup defaultValue="standard">
  <RadioField
    id="standard"
    value="standard"
    label="Standard Post"
    description="Default blog post format."
  />
  <RadioField
    id="aside"
    value="aside"
    label="Aside"
    description="Short status update."
  />
</RadioGroup>`} />

            <Divider />

            {/* ---- Accordion (Standalone) ---- */}
            <SectionHeading id="accordion">Accordion (Standalone)</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Collapsible multi-item accordion component powered by Radix UI. Distinct from widget cards — designed for FAQs, nested settings, or collapsible help tabs.
            </p>
            <Card className="mb-6">
              <CardContent className="py-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I install plugins in WandPress?</AccordionTrigger>
                    <AccordionContent>
                      WandPress uses the shadcn/ui approach — you own your components. Simply copy the component files from <code className="bg-wp-surface-alt px-1 rounded text-wp-text">src/components/ui/</code> directly into your project.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I customize the WordPress color palette?</AccordionTrigger>
                    <AccordionContent>
                      Yes! All colors are defined in <code className="bg-wp-surface-alt px-1 rounded text-wp-text">tailwind.config.js</code> under the <code className="bg-wp-surface-alt px-1 rounded text-wp-text">wp.*</code> color tokens. You can change any token to match your own brand while preserving the layout geometry.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it compatible with Next.js and Vite?</AccordionTrigger>
                    <AccordionContent>
                      WandPress works out of the box with Vite, Next.js (App Router and Pages Router), Remix, Astro, or any React 18+ framework.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <CodeBlock code={`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>How do I install plugins?</AccordionTrigger>
    <AccordionContent>
      Copy components directly into your project.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} />

            <Divider />

            {/* ---- Media Uploader ---- */}
            <SectionHeading id="media">Media Uploader / Dropzone</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Classic WordPress-style dashed drag-and-drop file upload area with file size warnings, multi-file selection, and file listing.
            </p>
            <Card className="mb-6">
              <CardContent className="py-5">
                <MediaUploader maxSizeMB={128} />
              </CardContent>
            </Card>
            <CodeBlock code={`import { MediaUploader } from '@/components/ui/media-uploader'

{/* Configurable max size and accepted file types */}
<MediaUploader
  maxSizeMB={128}
  accept="image/*,video/*,.pdf"
  onFilesSelected={(files) => console.log('Selected files:', files)}
/>`} />

            <Divider />

            {/* ---- Command Palette ---- */}
            <SectionHeading id="command">Command Palette (⌘K)</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              Instant search and keyboard-first action menu powered by <code className="bg-wp-surface-alt px-1 rounded text-wp-text">cmdk</code>. Press <kbd className="bg-wp-surface-alt border border-wp-border text-wp-text font-mono text-[11px] px-1.5 py-0.5 rounded shadow-sm">⌘K</kbd> (or <kbd className="bg-wp-surface-alt border border-wp-border text-wp-text font-mono text-[11px] px-1.5 py-0.5 rounded shadow-sm">Ctrl+K</kbd>) anywhere on this page to trigger it live.
            </p>
            <Demo
              preview={
                <div className="flex items-center gap-3">
                  <Button variant="primary" onClick={() => setCommandOpen(true)}>
                    <CommandIcon size={14} /> Open Command Palette
                  </Button>
                  <span className="text-[12px] text-wp-muted">
                    or press <kbd className="bg-white border border-wp-border px-1.5 py-0.5 rounded font-mono text-[11px] shadow-sm">⌘ K</kbd>
                  </span>
                </div>
              }
              code={`import {
  CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem, CommandShortcut
} from '@/components/ui/command'

// Inside your component:
const [open, setOpen] = useState(false)

// Keyboard shortcut listener:
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener('keydown', down)
  return () => document.removeEventListener('keydown', down)
}, [])

return (
  <CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Pages">
        <CommandItem onSelect={() => navigate('/posts')}>
          Posts
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
)`}
            />

            <Divider />

            {/* ---- Navigation ---- */}
            <SectionHeading id="nav">Navigation</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              The <code className="bg-wp-surface-alt px-1 rounded text-wp-text">Topbar</code> and <code className="bg-wp-surface-alt px-1 rounded text-wp-text">Sidebar</code> are already rendered on this page. Here's the usage pattern:
            </p>
            <CodeBlock code={`import { Topbar, TopbarBrand, TopbarNav, TopbarLink } from '@/components/ui/topbar'
import { Sidebar, SidebarSection, NavItem, NavLink, NavBadge } from '@/components/ui/sidebar'

// In your layout:
<Topbar>
  <TopbarBrand href="/">MySite</TopbarBrand>
  <TopbarNav>
    <TopbarLink href="/dashboard" active>Dashboard</TopbarLink>
    <TopbarLink href="/posts">Posts</TopbarLink>
  </TopbarNav>
</Topbar>

<Sidebar>
  <SidebarSection>
    <NavItem>
      <NavLink href="/posts" active>
        <FileText size={16} />
        Posts
        <NavBadge>3</NavBadge>
      </NavLink>
    </NavItem>
  </SidebarSection>
</Sidebar>

{/* Your page content needs padding to clear topbar + sidebar */}
<div className="pt-8 pl-40">
  {/* page content */}
</div>`} />

            <Divider />

            {/* ---- Theming ---- */}
            <SectionHeading id="theming">Theming</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              All colors are Tailwind custom tokens defined in <code className="bg-wp-surface-alt px-1 rounded text-wp-text">tailwind.config.js</code>.
              Override any color to theme the entire library instantly.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {[
                { name: '--wp-bg',      hex: '#f0f0f1', label: 'Page background' },
                { name: '--wp-surface', hex: '#ffffff',  label: 'Card surface' },
                { name: '--wp-border',  hex: '#c3c4c7', label: 'Borders' },
                { name: '--wp-primary', hex: '#2271b1', label: 'WP Blue (primary)' },
                { name: '--wp-text',    hex: '#1d2327', label: 'Body text' },
                { name: '--wp-muted',   hex: '#646970', label: 'Muted text' },
                { name: '--wp-success', hex: '#00a32a', label: 'Success' },
                { name: '--wp-warning', hex: '#dba617', label: 'Warning' },
                { name: '--wp-danger',  hex: '#d63638', label: 'Danger' },
              ].map(({ name, hex, label }) => (
                <div key={name} className="flex items-center gap-2.5 p-2 bg-white rounded border border-wp-border-light">
                  <div
                    className="w-8 h-8 rounded flex-shrink-0 border border-black/10"
                    style={{ background: hex }}
                  />
                  <div>
                    <p className="text-[11px] font-mono text-wp-text">{hex}</p>
                    <p className="text-[11px] text-wp-muted">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock
              language="tailwind.config.js"
              code={`// tailwind.config.js — override WandPress colors
export default {
  theme: {
    extend: {
      colors: {
        wp: {
          primary:        '#your-brand-color',
          'primary-hover':'#your-brand-hover',
          // All other wp.* tokens stay as WP defaults
        }
      }
    }
  }
}`}
            />

            <Divider />

            {/* ---- Installation ---- */}
            <SectionHeading id="installation">Installation</SectionHeading>

            <SubHeading>Option A: Install via npm (Recommended)</SubHeading>
            <p className="text-[13px] text-wp-muted mb-3">
              Install the pre-bundled library from the public npm registry:
            </p>
            <CodeBlock language="bash" code={`npm install wandpress`} />

            <p className="text-[13px] text-wp-muted mb-3 mt-4">
              Import the styles and components in your React or Next.js app:
            </p>
            <CodeBlock language="tsx" code={`import 'wandpress/wandpress.css'
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Badge, PostsTableTemplate } from 'wandpress'`} />

            <div className="mt-8 mb-4">
              <SubHeading>Option B: Clone repository or copy components</SubHeading>
              <p className="text-[13px] text-wp-muted mb-3">
                WandPress also follows the shadcn/ui philosophy — you can clone the repository and own the component files directly in your project.
              </p>
            </div>

            <CodeBlock language="bash" code={`# Clone the public repo
git clone https://github.com/jonbuster/wandpress.git

# Or copy just the components you need from
# src/components/ui/ into your own project`} />

            <SubHeading>Peer dependencies (for Option B)</SubHeading>
            <CodeBlock language="bash" code={`npm install @radix-ui/react-collapsible @radix-ui/react-dialog \\
  @radix-ui/react-slot class-variance-authority \\
  clsx tailwind-merge lucide-react`} />

            <SubHeading>Tailwind configuration (for Option B)</SubHeading>
            <CodeBlock language="tailwind.config.js" code={`// Add to your tailwind.config.js
colors: {
  wp: {
    bg:             '#f0f0f1',
    surface:        '#ffffff',
    'surface-alt':  '#f6f7f7',
    border:         '#c3c4c7',
    'border-light': '#dcdcde',
    text:           '#1d2327',
    muted:          '#646970',
    link:           '#2271b1',
    'link-hover':   '#135e96',
    primary:        '#2271b1',
    'primary-hover':'#135e96',
    'primary-light':'#d0dff4',
    success:        '#00a32a',
    'success-bg':   '#edfaef',
    warning:        '#dba617',
    'warning-bg':   '#fcf9e8',
    danger:         '#d63638',
    'danger-bg':    '#fde8e8',
    info:           '#72aee6',
    'info-bg':      '#e5f0fb',
    dark:           '#1d2327',
    'dark-surface': '#2c3338',
    topbar:         '#1d2327',
    sidebar:        '#1d2327',
  }
}

// Add to theme.extend.keyframes + animation:
keyframes: {
  'accordion-down': {
    from: { height: '0', opacity: '0' },
    to:   { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
    to:   { height: '0', opacity: '0' },
  },
},
animation: {
  'accordion-down': 'accordion-down 220ms ease-out',
  'accordion-up':   'accordion-up 220ms ease-out',
},`} />

            <SubHeading>4. Import and use</SubHeading>
            <CodeBlock code={`import { CardAccordion, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'

function MyDashboard() {
  return (
    <CardAccordion title="My Widget">
      <CardContent>
        <Alert variant="success" title="Done!" dismissible>
          Everything is working great.
        </Alert>
        <Button variant="primary">Save</Button>
      </CardContent>
    </CardAccordion>
  )
}`} />

          </div>


          <Divider />

          {/* ================================================================
              LLM.TXT / AI AGENT CONTEXT
              ================================================================ */}
          <div id="llm-txt" className="scroll-mt-16">
            <SectionHeading id="llm-txt-heading">llm.txt — AI Agent Context</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-4">
              A structured reference document specifically optimized for Large Language Models (LLMs), Cursor, Windsurf, Claude, and ChatGPT. Pass this context into your AI assistant prompt to generate pixel-perfect WandPress components and layouts.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(LLM_TXT)
                  setCopiedLlm(true)
                  setTimeout(() => setCopiedLlm(false), 2000)
                }}
              >
                {copiedLlm ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedLlm ? 'Copied llm.txt!' : 'Copy Entire llm.txt'}</span>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <a href="/llm.txt" target="_blank" rel="noreferrer">
                  <ExternalLink size={13} />
                  <span>View Raw /llm.txt ↗</span>
                </a>
              </Button>
              <Badge variant="info">llmstxt.org compatible</Badge>
            </div>

            {/* Code viewer enclosed in pre and code tag */}
            <div className="relative group rounded-md overflow-hidden border border-wp-border-light bg-[#1d2327] text-white text-[12px] font-mono shadow-sm">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-white/60 text-[11px] ml-1.5 font-mono">public/llm.txt</span>
                </div>
                <span className="text-[11px] text-white/40">Markdown / Plain text</span>
              </div>
              <pre className="p-4 max-h-[500px] overflow-y-auto leading-relaxed whitespace-pre-wrap select-text"><code className="text-emerald-300 font-mono text-[12px]">{LLM_TXT}</code></pre>
            </div>
          </div>

          <Divider />

          {/* ================================================================
              TYPOGRAPHY / HTML ELEMENTS
              ================================================================ */}
          <div id="typography">
            <SectionHeading id="typography-section">Typography & HTML Elements</SectionHeading>
            <p className="text-[13px] text-wp-muted mb-6">
              Base HTML elements styled with the WandPress WordPress-admin aesthetic.
              These apply automatically to any content rendered inside WandPress layouts.
            </p>

            {/* Headings */}
            <SubHeading>Headings</SubHeading>
            <Card className="mb-6">
              <CardContent className="space-y-3 py-5">
                <h1 className="text-[32px] font-bold leading-tight text-wp-text">h1. Heading One</h1>
                <h2 className="text-[26px] font-bold leading-tight text-wp-text">h2. Heading Two</h2>
                <h3 className="text-[22px] font-bold leading-snug text-wp-text">h3. Heading Three</h3>
                <h4 className="text-[18px] font-semibold leading-snug text-wp-text">h4. Heading Four</h4>
                <h5 className="text-[15px] font-semibold leading-snug text-wp-text">h5. Heading Five</h5>
                <h6 className="text-[13px] font-semibold leading-snug text-wp-muted uppercase tracking-wide">h6. Heading Six</h6>
              </CardContent>
            </Card>
            <CodeBlock code={`<h1 className="text-[32px] font-bold text-wp-text">Heading One</h1>
<h2 className="text-[26px] font-bold text-wp-text">Heading Two</h2>
<h3 className="text-[22px] font-bold text-wp-text">Heading Three</h3>
<h4 className="text-[18px] font-semibold text-wp-text">Heading Four</h4>
<h5 className="text-[15px] font-semibold text-wp-text">Heading Five</h5>
<h6 className="text-[13px] font-semibold text-wp-muted uppercase tracking-wide">Heading Six</h6>`} />

            {/* Paragraph & Lead */}
            <SubHeading>Paragraph &amp; Lead Text</SubHeading>
            <Card className="mb-6">
              <CardContent className="space-y-4 py-5">
                <p className="text-[16px] text-wp-muted leading-relaxed">
                  Lead paragraph. Used for introductory text or short descriptions that need slightly more prominence than body copy.
                </p>
                <p className="text-[13px] text-wp-text leading-relaxed">
                  Body paragraph. WordPress admin uses 13px system-font body text at 1.5 line height. This is the default for all content areas, cards, and panels across the UI. Keep paragraphs short and scannable.
                </p>
                <p className="text-[12px] text-wp-muted leading-relaxed">
                  Small / caption text. Used for meta information, timestamps, helper text, and secondary descriptions below form fields.
                </p>
              </CardContent>
            </Card>
            <CodeBlock code={`{/* Lead */}
<p className="text-[16px] text-wp-muted leading-relaxed">Lead paragraph text.</p>

{/* Body */}
<p className="text-[13px] text-wp-text leading-relaxed">Body paragraph text.</p>

{/* Caption / small */}
<p className="text-[12px] text-wp-muted leading-relaxed">Caption or helper text.</p>`} />

            {/* Links */}
            <SubHeading>Links</SubHeading>
            <Card className="mb-6">
              <CardContent className="flex flex-wrap items-center gap-6 py-5">
                <a href="#" className="text-wp-link hover:text-wp-link-hover hover:underline text-[13px]">Default link</a>
                <a href="#" className="text-wp-link hover:text-wp-link-hover underline text-[13px]">Underlined link</a>
                <a href="#" className="text-wp-danger hover:underline text-[13px]">Destructive link</a>
                <a href="#" className="text-wp-muted hover:text-wp-text hover:underline text-[13px]">Muted link</a>
                <a href="#" className="text-wp-link hover:text-wp-link-hover text-[13px]">External link ↗</a>
              </CardContent>
            </Card>
            <CodeBlock code={`<a href="#" className="text-wp-link hover:text-wp-link-hover hover:underline">Default link</a>
<a href="#" className="text-wp-link hover:text-wp-link-hover underline">Underlined link</a>
<a href="#" className="text-wp-danger hover:underline">Destructive link</a>
<a href="#" className="text-wp-muted hover:text-wp-text hover:underline">Muted link</a>`} />

            {/* Lists */}
            <SubHeading>Lists</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Unordered */}
              <Card>
                <CardContent className="py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-wp-muted mb-3">Unordered</p>
                  <ul className="list-disc list-inside space-y-1.5 text-[13px] text-wp-text">
                    <li>Publish posts &amp; pages</li>
                    <li>Manage media library</li>
                    <li>Install plugins</li>
                    <li>Configure settings</li>
                  </ul>
                </CardContent>
              </Card>
              {/* Ordered */}
              <Card>
                <CardContent className="py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-wp-muted mb-3">Ordered</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-[13px] text-wp-text">
                    <li>Install WordPress</li>
                    <li>Choose a theme</li>
                    <li>Add WandPress</li>
                    <li>Build your UI</li>
                  </ol>
                </CardContent>
              </Card>
              {/* Unstyled */}
              <Card>
                <CardContent className="py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-wp-muted mb-3">Unstyled / Nav list</p>
                  <ul className="space-y-1.5 text-[13px]">
                    <li><a href="#" className="text-wp-link hover:underline">→ Dashboard</a></li>
                    <li><a href="#" className="text-wp-link hover:underline">→ Posts</a></li>
                    <li><a href="#" className="text-wp-link hover:underline">→ Media</a></li>
                    <li><a href="#" className="text-wp-link hover:underline">→ Settings</a></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <CodeBlock code={`{/* Unordered */}
<ul className="list-disc list-inside space-y-1.5 text-[13px] text-wp-text">
  <li>Publish posts</li>
  <li>Manage media</li>
</ul>

{/* Ordered */}
<ol className="list-decimal list-inside space-y-1.5 text-[13px] text-wp-text">
  <li>Install WordPress</li>
  <li>Choose a theme</li>
</ol>`} />

            {/* Blockquote */}
            <SubHeading>Blockquote</SubHeading>
            <Card className="mb-6">
              <CardContent className="py-5">
                <blockquote className="border-l-4 border-wp-primary pl-4 py-1 text-[14px] text-wp-muted italic leading-relaxed">
                  "Code is like humor. When you have to explain it, it's bad."
                  <footer className="mt-2 text-[12px] not-italic text-wp-muted font-medium">— Cory House</footer>
                </blockquote>
              </CardContent>
            </Card>
            <CodeBlock code={`<blockquote className="border-l-4 border-wp-primary pl-4 py-1 text-[14px] text-wp-muted italic leading-relaxed">
  "Code is like humor. When you have to explain it, it's bad."
  <footer className="mt-2 text-[12px] not-italic font-medium">— Cory House</footer>
</blockquote>`} />

            {/* Inline code & pre */}
            <SubHeading>Code</SubHeading>
            <Card className="mb-6">
              <CardContent className="space-y-4 py-5">
                <p className="text-[13px] text-wp-text leading-relaxed">
                  Use the <code className="bg-wp-surface-alt border border-wp-border-light text-wp-text font-mono text-[12px] px-1.5 py-0.5 rounded">CardAccordion</code> component to create collapsible panels.
                  Pass a <code className="bg-wp-surface-alt border border-wp-border-light text-wp-text font-mono text-[12px] px-1.5 py-0.5 rounded">title</code> prop and nest children inside.
                </p>
                <pre className="bg-[#1d2327] text-white font-mono text-[12px] rounded-md p-4 overflow-x-auto leading-relaxed">{`import { CardAccordion } from '@/components/ui/card'

function MyWidget() {
  return (
    <CardAccordion title="My Widget">
      <p>Content here.</p>
    </CardAccordion>
  )
}`}</pre>
              </CardContent>
            </Card>
            <CodeBlock code={`{/* Inline code */}
<code className="bg-wp-surface-alt border border-wp-border-light font-mono text-[12px] px-1.5 py-0.5 rounded">
  CardAccordion
</code>

{/* Code block */}
<pre className="bg-[#1d2327] text-white font-mono text-[12px] rounded-md p-4 overflow-x-auto">
  {codeString}
</pre>`} />

            {/* Inline text elements */}
            <SubHeading>Inline Text Elements</SubHeading>
            <Card className="mb-6">
              <CardContent className="py-5">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-wp-text leading-relaxed">
                  <div><strong className="font-semibold">Bold / strong</strong> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">font-semibold</code></div>
                  <div><em className="italic">Italic / em</em> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">italic</code></div>
                  <div><u className="underline">Underline</u> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">underline</code></div>
                  <div><s className="line-through text-wp-muted">Strikethrough</s> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">line-through</code></div>
                  <div><mark className="bg-yellow-200 text-yellow-900 px-0.5 rounded">Highlighted</mark> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">bg-yellow-200</code></div>
                  <div><small className="text-[11px] text-wp-muted">Small text</small> — <code className="text-[12px] bg-wp-surface-alt px-1 rounded">text-[11px]</code></div>
                  <div>Text with <sup className="text-[10px]">superscript</sup></div>
                  <div>Text with <sub className="text-[10px]">subscript</sub></div>
                  <div><abbr title="Hypertext Markup Language" className="underline decoration-dotted cursor-help">HTML</abbr> — abbr with tooltip</div>
                  <div><kbd className="bg-wp-surface-alt border border-wp-border text-wp-text font-mono text-[11px] px-1.5 py-0.5 rounded shadow-sm">⌘ K</kbd> — keyboard shortcut</div>
                </div>
              </CardContent>
            </Card>
            <CodeBlock code={`<strong className="font-semibold">Bold</strong>
<em className="italic">Italic</em>
<u className="underline">Underline</u>
<s className="line-through text-wp-muted">Strikethrough</s>
<mark className="bg-yellow-200 text-yellow-900 px-0.5 rounded">Highlighted</mark>
<small className="text-[11px] text-wp-muted">Small</small>
<kbd className="bg-wp-surface-alt border border-wp-border font-mono text-[11px] px-1.5 py-0.5 rounded shadow-sm">⌘ K</kbd>`} />

            {/* Horizontal Rule */}
            <SubHeading>Divider / Horizontal Rule</SubHeading>
            <Card className="mb-6">
              <CardContent className="py-5 space-y-4">
                <p className="text-[13px] text-wp-text">Content above the divider.</p>
                <hr className="border-wp-border-light" />
                <p className="text-[13px] text-wp-text">Content below the divider.</p>
                <hr className="border-t-2 border-wp-primary w-16" />
                <p className="text-[13px] text-wp-muted">Accent divider variant — useful under section headings.</p>
              </CardContent>
            </Card>
            <CodeBlock code={`{/* Default divider */}
<hr className="border-wp-border-light" />

{/* Accent divider */}
<hr className="border-t-2 border-wp-primary w-16" />`} />

          </div>

          {/* Footer */}
          <div className="mt-16 pb-12 text-center text-[12px] text-wp-muted border-t border-wp-border-light pt-6">
            <p className="font-medium text-wp-text">WandPress — WordPress admin-inspired React components</p>
            <p className="mt-1">
              Built with Radix UI · Tailwind CSS · TypeScript · Open source under{' '}
              <span className="text-wp-primary font-semibold">MIT License</span>
            </p>
            <div className="mt-3 flex items-center justify-center gap-3 text-[12px]">
              <a
                href="https://www.npmjs.com/package/wandpress"
                target="_blank"
                rel="noreferrer"
                className="text-wp-link hover:underline font-medium"
              >
                npm package ↗
              </a>
              <span className="text-wp-border">·</span>
              <a
                href="https://github.com/jonbuster/wandpress"
                target="_blank"
                rel="noreferrer"
                className="text-wp-link hover:underline font-medium"
              >
                GitHub Repository ↗
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Global Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search pages, components, settings..." />
        <CommandList>
          <CommandEmpty>No matching results.</CommandEmpty>
          <CommandGroup heading="Navigation / Pages">
            <CommandItem onSelect={() => { window.location.hash = '#dashboard'; setCommandOpen(false) }}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#table'; setCommandOpen(false) }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Posts</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#media'; setCommandOpen(false) }}>
              <UploadCloud className="mr-2 h-4 w-4" />
              <span>Media Library</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#nav'; setCommandOpen(false) }}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#llm-txt'; setCommandOpen(false) }}>
              <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
              <span>llm.txt (AI Prompt & Context)</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Components">
            <CommandItem onSelect={() => { window.location.hash = '#sheet'; setCommandOpen(false) }}>
              <PanelRight className="mr-2 h-4 w-4" />
              <span>Sheet / Drawer</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#select'; setCommandOpen(false) }}>
              <Filter className="mr-2 h-4 w-4" />
              <span>Custom Select</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#accordion'; setCommandOpen(false) }}>
              <Layers className="mr-2 h-4 w-4" />
              <span>Accordion</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.hash = '#checkbox'; setCommandOpen(false) }}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Checkbox &amp; Radio</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

