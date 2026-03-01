import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TopBar,
  BottomBar,
  BottomBarTab,
  Dialog,
  Sheet,
  Button,
  Icon,
  Section,
  Container,
  ListItem,
  Card,
} from '../../components';

const meta: Meta = {
  title: 'Views/Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# View Patterns

Interactive demonstrations of the 5 core view patterns in Muka.
These patterns define how users navigate through the app and interact with content.

## Patterns

1. **Top-Level View** — App home with navigation tabs (floating bottom bar)
2. **Sub-Level View** — Deeper view with back button, no bottom navigation
3. **Non-Modal Top-Level Dialog** — Dismissible Sheet opened from a view
4. **Non-Modal Sub-Level Dialog** — Sheet with back + close buttons
5. **Modal Dialog** — Blocking dialog requiring explicit action

## Mobile vs Desktop

- **Mobile**: Dialogs and sheets fill the viewport width
- **Desktop**: Dialogs appear centered with a backdrop
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ─── Helper: MobileFrame container ───────────────────── */

const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: '375px',
      height: '667px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--color-border-default)',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'var(--color-surface-level0)',
      position: 'relative',
    }}
  >
    {children}
  </div>
);

/* ─── Helper buttons ──────────────────────────────────── */

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Go back" onClick={onClick}>
    <Icon name="arrow-left-s" size="md" />
  </Button>
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={onClick}>
    <Icon name="close" size="md" />
  </Button>
);

/* ─── Sample content components ───────────────────────── */

const HomeContent: React.FC<{ onItemClick: (id: string) => void }> = ({ onItemClick }) => (
  <Section padding="compact">
    <Container gap="compact">
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
        Welcome Back
      </h2>
      <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
        Your recent items
      </p>
      <Card>
        <ListItem
          label="Project Alpha"
          description="Last edited 2 hours ago"
          onClick={() => onItemClick('alpha')}
          trailing={<Icon name="arrow-right-s" size="sm" />}
        />
        <ListItem
          label="Project Beta"
          description="Last edited yesterday"
          onClick={() => onItemClick('beta')}
          trailing={<Icon name="arrow-right-s" size="sm" />}
        />
        <ListItem
          label="Project Gamma"
          description="Last edited 3 days ago"
          onClick={() => onItemClick('gamma')}
          trailing={<Icon name="arrow-right-s" size="sm" />}
        />
      </Card>
    </Container>
  </Section>
);

const ProjectDetailContent: React.FC<{ projectId: string; onEditClick: () => void }> = ({
  projectId,
  onEditClick,
}) => (
  <Section padding="compact">
    <Container gap="compact">
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
        Project {projectId.charAt(0).toUpperCase() + projectId.slice(1)}
      </h2>
      <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
        Project details and settings
      </p>
      <Card>
        <ListItem label="Status" trailing={<span style={{ opacity: 0.7 }}>Active</span>} />
        <ListItem label="Members" trailing={<span style={{ opacity: 0.7 }}>5</span>} />
        <ListItem label="Created" trailing={<span style={{ opacity: 0.7 }}>Jan 15, 2024</span>} />
      </Card>
      <div style={{ marginTop: '1rem' }}>
        <Button variant="primary" fullWidth onClick={onEditClick}>
          Edit Project
        </Button>
      </div>
    </Container>
  </Section>
);

/* ─── Story 1: Top-Level View → Sub-Level View → Modal Dialog ─── */

export const NavigationFlow: Story = {
  name: 'Navigation Flow Demo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=643-8634',
    },
  },
  render: () => {
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'profile'>('home');
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    // Top-Level View (home with tabs)
    if (!selectedProject) {
      return (
        <MobileFrame>
          <TopBar title="Home" bordered />
          <div style={{ flex: 1, overflow: 'auto' }}>
            <HomeContent onItemClick={setSelectedProject} />
          </div>
          <BottomBar variant="navigation" floating>
            <BottomBarTab
              icon={<Icon name="home" size="md" />}
              label="Home"
              active={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
            />
            <BottomBarTab
              icon={<Icon name="search" size="md" />}
              label="Search"
              active={activeTab === 'search'}
              onClick={() => setActiveTab('search')}
            />
            <BottomBarTab
              icon={<Icon name="user" size="md" />}
              label="Profile"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
          </BottomBar>
        </MobileFrame>
      );
    }

    // Sub-Level View (project detail)
    return (
      <MobileFrame>
        <TopBar
          title="Project Details"
          leading={<BackButton onClick={() => setSelectedProject(null)} />}
          bordered
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <ProjectDetailContent
            projectId={selectedProject}
            onEditClick={() => setEditDialogOpen(true)}
          />
        </div>

        {/* Modal Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          title="Edit Project"
          size="lg"
          modal
          leading={<BackButton onClick={() => setEditDialogOpen(false)} />}
          trailing={<CloseButton onClick={() => setEditDialogOpen(false)} />}
          footer={
            <BottomBar variant="actions">
              <Button variant="secondary" size="lg" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={() => setEditDialogOpen(false)}>
                Save Changes
              </Button>
            </BottomBar>
          }
        >
          <Section padding="compact">
            <Container gap="compact">
              <p style={{ margin: '0 0 1rem', opacity: 0.7 }}>
                This modal dialog blocks interaction until dismissed.
              </p>
              <Card>
                <ListItem label="Project Name" trailing={<span style={{ opacity: 0.7 }}>Alpha</span>} />
                <ListItem label="Description" trailing={<span style={{ opacity: 0.7 }}>Edit...</span>} />
                <ListItem label="Visibility" trailing={<span style={{ opacity: 0.7 }}>Private</span>} />
              </Card>
            </Container>
          </Section>
        </Dialog>
      </MobileFrame>
    );
  },
};

/* ─── Story 2: Top-Level View with Non-Modal Sheet ─── */

export const SheetFlow: Story = {
  name: 'Sheet Dialog Demo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=653-8749',
    },
  },
  render: () => {
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'profile'>('home');
    const [sheetOpen, setSheetOpen] = useState(false);
    const [subSheetOpen, setSubSheetOpen] = useState(false);

    return (
      <MobileFrame>
        <TopBar
          title="Home"
          trailing={
            <Button variant="ghost" size="sm" iconOnly aria-label="Add" onClick={() => setSheetOpen(true)}>
              <Icon name="add" size="md" />
            </Button>
          }
          bordered
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Section padding="compact">
            <Container gap="compact">
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                Quick Actions
              </h2>
              <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
                Tap the + button to open a non-modal sheet
              </p>
              <Card>
                <ListItem
                  label="Create New Project"
                  description="Start from scratch"
                  onClick={() => setSheetOpen(true)}
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
                <ListItem
                  label="Import Project"
                  description="From file or URL"
                  onClick={() => setSheetOpen(true)}
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
              </Card>
            </Container>
          </Section>
        </div>
        <BottomBar variant="navigation" floating>
          <BottomBarTab
            icon={<Icon name="home" size="md" />}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <BottomBarTab
            icon={<Icon name="search" size="md" />}
            label="Search"
            active={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          />
          <BottomBarTab
            icon={<Icon name="user" size="md" />}
            label="Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </BottomBar>

        {/* Non-Modal Top-Level Sheet */}
        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Create New"
          snapPoint="half"
          trailing={<CloseButton onClick={() => setSheetOpen(false)} />}
        >
          <Section padding="compact">
            <Container gap="compact">
              <p style={{ margin: '0 0 1rem', opacity: 0.7 }}>
                Choose what you want to create. Tap backdrop to dismiss.
              </p>
              <Card>
                <ListItem
                  label="Blank Project"
                  description="Start with an empty canvas"
                  onClick={() => setSubSheetOpen(true)}
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
                <ListItem
                  label="From Template"
                  description="Use a pre-built template"
                  onClick={() => setSubSheetOpen(true)}
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
                <ListItem
                  label="Import"
                  description="Import from file"
                  onClick={() => setSubSheetOpen(true)}
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
              </Card>
            </Container>
          </Section>
        </Sheet>

        {/* Non-Modal Sub-Level Sheet */}
        <Sheet
          open={subSheetOpen}
          onClose={() => {
            setSubSheetOpen(false);
            setSheetOpen(false);
          }}
          title="Project Details"
          snapPoint="full"
          leading={<BackButton onClick={() => setSubSheetOpen(false)} />}
          trailing={
            <CloseButton
              onClick={() => {
                setSubSheetOpen(false);
                setSheetOpen(false);
              }}
            />
          }
          footer={
            <BottomBar variant="actions">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setSubSheetOpen(false);
                  setSheetOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setSubSheetOpen(false);
                  setSheetOpen(false);
                }}
              >
                Create
              </Button>
            </BottomBar>
          }
        >
          <Section padding="compact">
            <Container gap="compact">
              <p style={{ margin: '0 0 1rem', opacity: 0.7 }}>
                Sub-level sheet: Back returns to parent, Close dismisses all.
              </p>
              <Card>
                <ListItem label="Name" trailing={<span style={{ opacity: 0.7 }}>Enter name...</span>} />
                <ListItem label="Description" trailing={<span style={{ opacity: 0.7 }}>Optional</span>} />
                <ListItem label="Template" trailing={<span style={{ opacity: 0.7 }}>Blank</span>} />
              </Card>
            </Container>
          </Section>
        </Sheet>
      </MobileFrame>
    );
  },
};

/* ─── Story 3: Modal Dialog (standalone) ─── */

export const ModalDialogDemo: Story = {
  name: 'Modal Dialog',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=657-9369',
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '400px' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Modal Dialog Pattern</h3>
          <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
            A blocking dialog that requires user action. Cannot be dismissed by tapping the backdrop.
            On mobile: full-width. On desktop: centered card with backdrop.
          </p>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open Modal Dialog
          </Button>
        </div>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Delete"
          size="lg"
          modal
          trailing={<CloseButton onClick={() => setOpen(false)} />}
          footer={
            <BottomBar variant="actions">
              <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </BottomBar>
          }
        >
          <Section padding="compact">
            <Container gap="compact">
              <p style={{ margin: 0 }}>
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
            </Container>
          </Section>
        </Dialog>
      </div>
    );
  },
};

/* ─── Story 4: Top-Level View ─── */

export const TopLevelView: Story = {
  name: 'Top-Level View',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=643-8634',
    },
  },
  render: () => {
    const [activeTab, setActiveTab] = useState<'home' | 'search' | 'alerts' | 'profile'>('home');

    return (
      <MobileFrame>
        <TopBar title="Home" bordered />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Section padding="compact">
            <Container gap="compact">
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                Top-Level View
              </h2>
              <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
                App home screen with floating navigation bar. No back button — this is the root.
              </p>
              <Card>
                <ListItem
                  label="Feature 1"
                  description="Tap to navigate deeper"
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
                <ListItem
                  label="Feature 2"
                  description="Another navigation option"
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
                <ListItem
                  label="Feature 3"
                  description="More content here"
                  trailing={<Icon name="arrow-right-s" size="sm" />}
                />
              </Card>
            </Container>
          </Section>
        </div>
        <BottomBar variant="navigation" floating>
          <BottomBarTab
            icon={<Icon name="home" size="md" />}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <BottomBarTab
            icon={<Icon name="search" size="md" />}
            label="Search"
            active={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          />
          <BottomBarTab
            icon={<Icon name="bell" size="md" />}
            label="Alerts"
            active={activeTab === 'alerts'}
            onClick={() => setActiveTab('alerts')}
          />
          <BottomBarTab
            icon={<Icon name="user" size="md" />}
            label="Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </BottomBar>
      </MobileFrame>
    );
  },
};

/* ─── Story 5: Sub-Level View ─── */

export const SubLevelView: Story = {
  name: 'Sub-Level View',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RL5IFLUJk4yeAFNXlsX4b5/Muka-UI-Figma-Library?node-id=625-1853',
    },
  },
  render: () => {
    return (
      <MobileFrame>
        <TopBar
          title="Project Details"
          leading={<BackButton onClick={() => alert('Navigate back')} />}
          bordered
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Section padding="compact">
            <Container gap="compact">
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                Sub-Level View
              </h2>
              <p style={{ margin: '0 0 1rem', opacity: 0.7, fontSize: '0.875rem' }}>
                Deeper view with back button. No bottom navigation bar — user is focused on this
                content.
              </p>
              <Card>
                <ListItem label="Name" trailing={<span style={{ opacity: 0.7 }}>Project Alpha</span>} />
                <ListItem label="Status" trailing={<span style={{ opacity: 0.7 }}>Active</span>} />
                <ListItem label="Members" trailing={<span style={{ opacity: 0.7 }}>5</span>} />
                <ListItem label="Created" trailing={<span style={{ opacity: 0.7 }}>Jan 15, 2024</span>} />
              </Card>
              <div style={{ marginTop: '1rem' }}>
                <Button variant="primary" fullWidth>
                  Edit Project
                </Button>
              </div>
            </Container>
          </Section>
        </div>
      </MobileFrame>
    );
  },
};
