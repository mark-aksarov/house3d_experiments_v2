import App from 'components/App/App';
import { render } from '@/utils/test-utils';
import AppSideToolBar from './AppSideToolBar';
import createMatchMedia from '@/utils/createMatchMedia';
import { fireEvent, screen } from "@testing-library/react";

describe('AppSideToolBar', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it('should render SideToolBar', () => {
    render(
      <AppSideToolBar />
    );
    expect(screen.getByTestId("app-side-tool-bar")).toBeInTheDocument();
  });

  it.each([
    { name: 'settings', testId: 'settings-side-sheet' },
    { name: 'appearance', testId: 'appearance-side-sheet' },
    { name: 'viewpoint', testId: 'viewpoint-side-sheet' }
  ])(
    "should open $name side sheet when $name button is clicked",
    ({ name, testId }) => {
      render(<App />);

      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();

      const button = screen.getByRole("button", { name: new RegExp(name, "i") });
      fireEvent.click(button);

      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  );
});
