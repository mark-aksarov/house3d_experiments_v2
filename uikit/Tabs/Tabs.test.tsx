import Tab from './Tab';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import { render, screen, fireEvent } from '@testing-library/react';
import TabPanelContainer from './TabPanelContainer';

describe('Tabs', () => {
  function TabsComponent({ tab = 'tab1', onTabChange }: { tab?: string, onTabChange: (tab: string) => void }) {
    return (
      <Tabs value={tab} onChange={onTabChange}>
        <Tab id="tab1" size="regular" label="Tab 1" />
        <Tab id="tab2" size="regular" label="Tab 2" />

        <TabPanelContainer>
          <TabPanel id="panel1" activeTabId={tab} tabId="tab1">
            Panel 1 Content
          </TabPanel>
          <TabPanel id="panel2" activeTabId={tab} tabId="tab2">
            Panel 2 Content
          </TabPanel>
        </TabPanelContainer>
      </Tabs>
    );
  };

  it('renders tabs and panels with the correct initial state', () => {
    render(<TabsComponent tab='tab1' onTabChange={() => { }} />);

    const tab1 = screen.getByRole('tab', { name: /Tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /Tab 2/i });
    const panel1 = screen.getByText('Panel 1 Content');
    const panel2 = screen.queryByText('Panel 2 Content');

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');

    expect(panel1).toBeInTheDocument();
    expect(panel2).toBeInTheDocument();

    expect(panel1).not.toHaveClass('tabPanelHidden');
    expect(panel2).toHaveClass('tabPanelHidden');
  });

  it('switches tabs when clicking tab', () => {
    const onTabChange = jest.fn();
    render(<TabsComponent tab='tab1' onTabChange={onTabChange} />);

    const tab2 = screen.getByRole('tab', { name: /Tab 2/i });

    fireEvent.click(tab2);

    expect(onTabChange.mock.calls).toHaveLength(1);
  });

  it('should re-render tabs when tab prop changes', () => {
    const { rerender } = render(<TabsComponent tab='tab1' onTabChange={() => { }} />);

    expect(screen.getByRole('tab', { name: /Tab 1/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Tab 2/i })).toHaveAttribute('aria-selected', 'false');

    const panel1 = screen.queryByText('Panel 1 Content');
    const panel2 = screen.queryByText('Panel 2 Content');

    expect(panel1).toBeInTheDocument();
    expect(panel2).toBeInTheDocument();

    expect(panel1).not.toHaveClass('tabPanelHidden');
    expect(panel2).toHaveClass('tabPanelHidden');

    rerender(<TabsComponent tab='tab2' onTabChange={() => { }} />);

    expect(screen.getByRole('tab', { name: /Tab 1/i })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /Tab 2/i })).toHaveAttribute('aria-selected', 'true');

    expect(panel1).toHaveClass('tabPanelHidden');
    expect(panel2).not.toHaveClass('tabPanelHidden');
  });
});