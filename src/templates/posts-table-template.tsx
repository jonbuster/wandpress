import * as React from 'react'
import { Plus, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Checkbox } from '../components/ui/checkbox'
import { SearchInput } from '../components/ui/search-input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { TableWrapper, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table'
import { Pagination } from '../components/ui/pagination'
import { Input } from '../components/ui/input'
import { useToast } from '../components/ui/toast'

interface Post {
  id: string
  title: string
  slug: string
  author: string
  categories: string[]
  tags: string[]
  comments: number
  date: string
  status: 'published' | 'draft' | 'trash'
}

const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Hello world!',
    slug: 'hello-world',
    author: 'admin',
    categories: ['Uncategorized'],
    tags: ['welcome', 'wordpress'],
    comments: 3,
    date: '2026/09/05 at 2:26 am',
    status: 'published',
  },
  {
    id: '2',
    title: 'Getting Started with WandPress Design System',
    slug: 'getting-started-wandpress',
    author: 'kaninrice',
    categories: ['Design', 'Development'],
    tags: ['react', 'tailwind', 'radix'],
    comments: 8,
    date: '2026/09/08 at 10:15 am',
    status: 'published',
  },
  {
    id: '3',
    title: 'Best Practices for Accessible Admin Interfaces',
    slug: 'accessible-admin-ui',
    author: 'kaninrice',
    categories: ['Accessibility', 'UX'],
    tags: ['a11y', 'radix', 'aria'],
    comments: 0,
    date: '2026/09/09 at 1:40 pm',
    status: 'draft',
  },
  {
    id: '4',
    title: 'Deep Dive: State Management in Modern Admin Panels',
    slug: 'state-management-admin',
    author: 'editor',
    categories: ['Development'],
    tags: ['react', 'typescript'],
    comments: 12,
    date: '2026/08/29 at 4:20 pm',
    status: 'published',
  },
  {
    id: '5',
    title: 'Deprecated Features in WordPress 7.1',
    slug: 'deprecated-features-wp',
    author: 'admin',
    categories: ['News & Updates'],
    tags: ['core', 'release'],
    comments: 1,
    date: '2026/08/14 at 9:00 am',
    status: 'trash',
  },
]

export function PostsTableTemplate() {
  const { toast } = useToast()
  const [posts, setPosts] = React.useState<Post[]>(initialPosts)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [currentFilter, setCurrentFilter] = React.useState<'all' | 'published' | 'draft' | 'trash'>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null)
  const [editForm, setEditForm] = React.useState<{ title: string; slug: string; status: 'published' | 'draft' | 'trash' }>({
    title: '',
    slug: '',
    status: 'published',
  })
  const [page, setPage] = React.useState(1)

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (currentFilter !== 'all' && post.status !== currentFilter) return false
    if (searchQuery.trim()) {
      return (
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  // Select all handler
  const allSelected = filteredPosts.length > 0 && filteredPosts.every((p) => selectedIds.includes(p.id))
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPosts.map((p) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Quick edit
  const startQuickEdit = (post: Post) => {
    setEditingPostId(post.id)
    setEditForm({
      title: post.title,
      slug: post.slug,
      status: post.status,
    })
  }

  const saveQuickEdit = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...editForm } : p))
    )
    setEditingPostId(null)
    toast({
      variant: 'success',
      title: 'Post updated.',
      description: 'Quick edit changes have been saved.',
    })
  }

  // Move to trash
  const moveToTrash = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'trash' as const } : p))
    )
    toast({
      variant: 'default',
      title: '1 post moved to the Trash.',
      action: {
        label: 'Undo',
        onClick: () => {
          setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: 'published' as const } : p))
          )
        },
      },
    })
  }

  // Counts
  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    trash: posts.filter((p) => p.status === 'trash').length,
  }

  return (
    <div className="bg-white border border-wp-border rounded shadow-sm p-5 space-y-4">
      {/* Title & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-wp-border-light">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold text-wp-text">Posts</h2>
          <Button variant="secondary" size="sm" className="gap-1 font-semibold">
            <Plus size={14} /> Add New Post
          </Button>
        </div>
        <SearchInput
          inputSize="sm"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          className="w-64"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center text-[13px] text-wp-muted gap-1 select-none">
        <button
          type="button"
          onClick={() => setCurrentFilter('all')}
          className={`hover:underline cursor-pointer ${
            currentFilter === 'all' ? 'text-wp-text font-semibold' : 'text-wp-link'
          }`}
        >
          All <span className="text-wp-muted">({counts.all})</span>
        </button>
        <span>|</span>
        <button
          type="button"
          onClick={() => setCurrentFilter('published')}
          className={`hover:underline cursor-pointer ${
            currentFilter === 'published' ? 'text-wp-text font-semibold' : 'text-wp-link'
          }`}
        >
          Published <span className="text-wp-muted">({counts.published})</span>
        </button>
        <span>|</span>
        <button
          type="button"
          onClick={() => setCurrentFilter('draft')}
          className={`hover:underline cursor-pointer ${
            currentFilter === 'draft' ? 'text-wp-text font-semibold' : 'text-wp-link'
          }`}
        >
          Drafts <span className="text-wp-muted">({counts.draft})</span>
        </button>
        <span>|</span>
        <button
          type="button"
          onClick={() => setCurrentFilter('trash')}
          className={`hover:underline cursor-pointer ${
            currentFilter === 'trash' ? 'text-wp-text font-semibold' : 'text-wp-link'
          }`}
        >
          Trash <span className="text-wp-muted">({counts.trash})</span>
        </button>
      </div>

      {/* Filter / Bulk Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Bulk Actions */}
          <div className="w-36">
            <Select defaultValue="bulk">
              <SelectTrigger className="h-7 text-[12px]">
                <SelectValue placeholder="Bulk actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bulk">Bulk actions</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="trash">Move to Trash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" size="sm">
            Apply
          </Button>

          {/* Date Filter */}
          <div className="w-36 hidden sm:block">
            <Select defaultValue="all">
              <SelectTrigger className="h-7 text-[12px]">
                <SelectValue placeholder="All dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="2026-09">September 2026</SelectItem>
                <SelectItem value="2026-08">August 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="w-36 hidden sm:block">
            <Select defaultValue="all">
              <SelectTrigger className="h-7 text-[12px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
            Filter
          </Button>
        </div>

        <div className="text-[12px] text-wp-muted">
          {filteredPosts.length} items
        </div>
      </div>

      {/* Posts Table */}
      <TableWrapper className="border border-wp-border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-28">Author</TableHead>
              <TableHead className="w-36">Categories</TableHead>
              <TableHead className="w-32 hidden md:table-cell">Tags</TableHead>
              <TableHead className="w-16 text-center">
                <span title="Comments">
                  <MessageSquare size={14} className="mx-auto" />
                </span>
              </TableHead>
              <TableHead className="w-44">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-wp-muted">
                  No posts found matching the current criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <React.Fragment key={post.id}>
                  <TableRow className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(post.id)}
                        onCheckedChange={() => toggleSelectOne(post.id)}
                        aria-label={`Select ${post.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <a
                            href="#"
                            className="font-semibold text-wp-link hover:text-wp-link-hover hover:underline"
                          >
                            {post.title}
                          </a>
                          {post.status === 'draft' && (
                            <Badge variant="warning">Draft</Badge>
                          )}
                          {post.status === 'trash' && (
                            <Badge variant="danger">Trash</Badge>
                          )}
                        </div>

                        {/* Row Actions (visible on hover) */}
                        <div className="flex items-center gap-2 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                          {post.status !== 'trash' ? (
                            <>
                              <a href="#" className="text-wp-link hover:underline">
                                Edit
                              </a>
                              <span className="text-wp-border">|</span>
                              <button
                                type="button"
                                onClick={() => startQuickEdit(post)}
                                className="text-wp-link hover:underline p-0 bg-transparent border-none cursor-pointer text-[11px]"
                              >
                                Quick Edit
                              </button>
                              <span className="text-wp-border">|</span>
                              <button
                                type="button"
                                onClick={() => moveToTrash(post.id)}
                                className="text-wp-danger hover:underline p-0 bg-transparent border-none cursor-pointer text-[11px]"
                              >
                                Trash
                              </button>
                              <span className="text-wp-border">|</span>
                              <a href="#" className="text-wp-link hover:underline">
                                View
                              </a>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setPosts((prev) =>
                                    prev.map((p) =>
                                      p.id === post.id ? { ...p, status: 'published' } : p
                                    )
                                  )
                                }}
                                className="text-wp-link hover:underline p-0 bg-transparent border-none cursor-pointer text-[11px]"
                              >
                                Restore
                              </button>
                              <span className="text-wp-border">|</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setPosts((prev) => prev.filter((p) => p.id !== post.id))
                                }
                                className="text-wp-danger hover:underline p-0 bg-transparent border-none cursor-pointer text-[11px]"
                              >
                                Delete Permanently
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-wp-muted">{post.author}</TableCell>
                    <TableCell className="text-wp-muted">
                      {post.categories.join(', ')}
                    </TableCell>
                    <TableCell className="text-wp-muted hidden md:table-cell">
                      {post.tags.join(', ')}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-wp-surface-alt border border-wp-border text-[11px] font-semibold text-wp-muted">
                        {post.comments}
                      </span>
                    </TableCell>
                    <TableCell className="text-[12px] text-wp-muted leading-tight">
                      <span className="capitalize">{post.status}</span>
                      <br />
                      <span>{post.date}</span>
                    </TableCell>
                  </TableRow>

                  {/* Inline Quick Edit Row */}
                  {editingPostId === post.id && (
                    <TableRow className="bg-wp-surface-alt/70 border-y-2 border-wp-primary">
                      <TableCell colSpan={7} className="p-4 space-y-3">
                        <div className="text-[12px] font-bold text-wp-text uppercase tracking-wider">
                          Quick Edit
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-medium text-wp-text mb-1">
                              Title
                            </label>
                            <Input
                              inputSize="sm"
                              value={editForm.title}
                              onChange={(e) =>
                                setEditForm((f) => ({ ...f, title: e.target.value }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-wp-text mb-1">
                              Slug
                            </label>
                            <Input
                              inputSize="sm"
                              value={editForm.slug}
                              onChange={(e) =>
                                setEditForm((f) => ({ ...f, slug: e.target.value }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-wp-text mb-1">
                              Status
                            </label>
                            <Select
                              value={editForm.status}
                              onValueChange={(val: any) =>
                                setEditForm((f) => ({ ...f, status: val }))
                              }
                            >
                              <SelectTrigger className="h-7 text-[12px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="trash">Trash</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPostId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => saveQuickEdit(post.id)}
                          >
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableWrapper>

      {/* Footer Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-36">
            <Select defaultValue="bulk">
              <SelectTrigger className="h-7 text-[12px]">
                <SelectValue placeholder="Bulk actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bulk">Bulk actions</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="trash">Move to Trash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" size="sm">
            Apply
          </Button>
        </div>

        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
