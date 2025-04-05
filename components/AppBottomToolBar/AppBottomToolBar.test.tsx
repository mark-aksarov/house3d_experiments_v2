import App from 'components/App';
import { render } from '@/utils/test-utils';
import AppBottomToolBar from './AppBottomToolBar';
import createMatchMedia from '@/utils/createMatchMedia';
import { fireEvent, screen } from "@testing-library/react";

describe('AppBottomToolBar', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AppBottomToolBar', () => {
    render(<AppBottomToolBar />);
    expect(screen.getByTestId("app-bottom-tool-bar")).toBeInTheDocument();
  });

  it.each([
    { name: 'settings', testId: 'settings-bottom-sheet' },
    { name: 'appearance', testId: 'appearance-bottom-sheet' }
  ])(
    "should open $name bottom sheet when $name tab is clicked",
    ({ name, testId }) => {
      render(<App />);

      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();

      const button = screen.getByRole("tab", { name: new RegExp(name, "i") });
      fireEvent.click(button);

      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  );
});
