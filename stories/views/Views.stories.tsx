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
  Input,
  Select,
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

/* ─── Helper: Full viewport container ───────────────────── */

const ViewContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-surface-level2)',
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
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-default-default)' }}>
        Welcome Back
      </h2>
      <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'var(--color-text-subtle-default)' }}>
        Your recent items
      </p>
      <Card padding="none">
        <ListItem
          label="Project Alpha"
          caption="Last edited 2 hours ago"
          leadingImage="https://picsum.photos/seed/alpha/80/80"
          showChevron
          onClick={() => onItemClick('alpha')}
        />
        <ListItem
          label="Project Beta"
          caption="Last edited yesterday"
          leadingImage="https://picsum.photos/seed/beta/80/80"
          showChevron
          onClick={() => onItemClick('beta')}
        />
        <ListItem
          label="Project Gamma"
          caption="Last edited 3 days ago"
          leadingImage="https://picsum.photos/seed/gamma/80/80"
          showChevron
          onClick={() => onItemClick('gamma')}
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
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-default-default)' }}>
        Project {projectId.charAt(0).toUpperCase() + projectId.slice(1)}
      </h2>
      <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'var(--color-text-subtle-default)' }}>
        Project details and settings
      </p>
      <Card padding="none">
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
    const [confirmSheetOpen, setConfirmSheetOpen] = useState(false);

    // Initial values to detect changes
    const initialValues = { name: 'Alpha', description: '', visibility: 'private' };

    // Form state for edit dialog
    const [projectName, setProjectName] = useState(initialValues.name);
    const [projectDescription, setProjectDescription] = useState(initialValues.description);
    const [visibility, setVisibility] = useState(initialValues.visibility);

    // Check if form has unsaved changes
    const hasChanges =
      projectName !== initialValues.name ||
      projectDescription !== initialValues.description ||
      visibility !== initialValues.visibility;

    const handleCloseOrCancel = () => {
      if (hasChanges) {
        setConfirmSheetOpen(true);
      } else {
        setEditDialogOpen(false);
      }
    };

    const handleSaveChanges = () => {
      // Save and close directly (no confirmation needed)
      setEditDialogOpen(false);
    };

    const handleConfirmSave = () => {
      setConfirmSheetOpen(false);
      setEditDialogOpen(false);
    };

    const handleDiscardChanges = () => {
      // Reset form values
      setProjectName(initialValues.name);
      setProjectDescription(initialValues.description);
      setVisibility(initialValues.visibility);
      setConfirmSheetOpen(false);
      setEditDialogOpen(false);
    };

    // Top-Level View (home with tabs)
    if (!selectedProject) {
      return (
        <ViewContainer>
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
        </ViewContainer>
      );
    }

    // Sub-Level View (project detail)
    return (
      <ViewContainer>
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

        {/* Edit Project Dialog - only close button, no back button */}
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseOrCancel}
          title="Edit Project"
          size="lg"
          modal
          trailing={<CloseButton onClick={handleCloseOrCancel} />}
          footer={
            <BottomBar variant="actions">
              <Button variant="secondary" size="lg" onClick={handleCloseOrCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleSaveChanges}>
                Save
              </Button>
            </BottomBar>
          }
        >
          <Section padding="compact">
            <Container gap="compact">
              <Input
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                fullWidth
              />
              <Input
                label="Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                fullWidth
              />
              <Select
                label="Visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                options={[
                  { value: 'private', label: 'Private' },
                  { value: 'public', label: 'Public' },
                ]}
                fullWidth
              />
            </Container>
          </Section>

          {/* Save Changes Confirmation Sheet (non-modal, inside Dialog) */}
          {confirmSheetOpen && (
            <Sheet
              open={confirmSheetOpen}
              onClose={() => setConfirmSheetOpen(false)}
              title="Save changes?"
              snapPoint="content"
            >
              <Section padding="compact" style={{ padding: 0 }}>
                <Container gap="compact" style={{ maxWidth: 'none' }}>
                  <p style={{ margin: 0, color: 'var(--color-text-subtle-default)' }}>
                    You have made changes. Do you want to save them?
                  </p>
                  <BottomBar variant="actions">
                    <Button variant="secondary" size="lg" onClick={handleDiscardChanges}>
                      Discard
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleConfirmSave}>
                      Save
                    </Button>
                  </BottomBar>
                </Container>
              </Section>
            </Sheet>
          )}
        </Dialog>
      </ViewContainer>
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
      <ViewContainer>
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
              <Card padding="none">
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
              <Card padding="none">
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
              <Card padding="none">
                <ListItem label="Name" trailing={<span style={{ opacity: 0.7 }}>Enter name...</span>} />
                <ListItem label="Description" trailing={<span style={{ opacity: 0.7 }}>Optional</span>} />
                <ListItem label="Template" trailing={<span style={{ opacity: 0.7 }}>Blank</span>} />
              </Card>
            </Container>
          </Section>
        </Sheet>
      </ViewContainer>
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
      <ViewContainer>
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
              <Card padding="none">
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
      </ViewContainer>
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
      <ViewContainer>
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
              <Card padding="none">
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
      </ViewContainer>
    );
  },
};
