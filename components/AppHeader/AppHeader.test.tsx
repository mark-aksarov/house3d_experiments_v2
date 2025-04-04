import AppHeader from "./AppHeader";
import { render } from '@/utils/test-utils';
import createMatchMedia from "@/utils/createMatchMedia";
import { fireEvent, screen } from "@testing-library/react";

const setAboutSheetOpen = jest.fn();
const setAboutModalOpen = jest.fn();

function renderAppHeader() {
  return <AppHeader
    setAboutSheetOpen={setAboutSheetOpen}
    setAboutModalOpen={setAboutModalOpen}
  />;
}

describe('AppHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it('should render header', () => {
    render(renderAppHeader());

    expect(screen.getByText("House 3D")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it('should open menu when menu button is clicked', () => {
    render(renderAppHeader());

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    expect(screen.queryByRole("menu")).toBeInTheDocument();
    expect(screen.getByTestId("github-menu-item-button")).toBeInTheDocument();
    expect(screen.getByTestId("about-menu-item-button")).toBeInTheDocument();
  });

  it('should open about sheet when about button is clicked', () => {
    render(renderAppHeader());

    fireEvent.click(screen.getByRole("button", { name: /about/i }));

    expect(setAboutSheetOpen).toHaveBeenCalledTimes(1);
  });

  it('should open about modal when about menu item button is clicked', () => {
    render(renderAppHeader());

    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    fireEvent.click(screen.getByTestId("about-menu-item-button"));

    expect(setAboutModalOpen).toHaveBeenCalledTimes(1);
  });
})