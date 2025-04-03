import React from "react";
import Menu from "./Menu";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import "@testing-library/jest-dom";
import MenuButton from "./MenuButton";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, act } from "@testing-library/react";

jest.useFakeTimers();

describe("Menu Component", () => {
  it("opens the Menu when clicking the MenuButton", async () => {
    render(
      <Menu>
        <MenuButton>Open Menu</MenuButton>
        <MenuList>
          <MenuItem>
            <MenuButton>
              Item 1
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton>
              Item 2
            </MenuButton>
          </MenuItem>
        </MenuList>
      </Menu>
    );
    await act(async () => { }); // Flush microtasks.

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("closes the Menu when pressing Escape", async () => {
    render(
      <>
        <Menu>
          <MenuButton>Open Menu</MenuButton>
          <MenuList>
            <MenuItem>
              <MenuButton>
                Item 1
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton>
                Item 2
              </MenuButton>
            </MenuItem>
          </MenuList>
        </Menu>
        <button>Outside</button>
      </>
    );
    await act(async () => { }); // Flush microtasks.

    // Open the menu
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Press Escape
    const user = userEvent.setup({ delay: null });
    await user.keyboard('[Escape]');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Menu should be closed
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("disables a MenuItem when the disabled prop is set", async () => {
    render(
      <Menu>
        <MenuButton>Open Menu</MenuButton>
        <MenuList>
          <MenuItem>
            <MenuButton>
              Item 1
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton disabled>
              Item 2
            </MenuButton>
          </MenuItem>
        </MenuList>
      </Menu>
    );
    await act(async () => { }); // Flush microtasks.

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    expect(screen.getByText("Item 1")).not.toHaveAttribute("disabled");
    expect(screen.getByText("Item 2")).toHaveAttribute("disabled");
  });

  it("handles custom elements passed to MenuButton", async () => {
    render(
      <Menu>
        <MenuButton as="a" href="https://example.com">
          Open Menu
        </MenuButton>
        <MenuList>
          <MenuItem>
            <MenuButton>
              Item 1
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton>
              Item 2
            </MenuButton>
          </MenuItem>
        </MenuList>
      </Menu>
    );
    await act(async () => { }); // Flush microtasks.

    expect(screen.getByRole("link", { name: /open menu/i })).toBeInTheDocument();
  });

  it("MenuItemButton supports as prop", () => {
    render(
      <Menu>
        <MenuButton>Open Menu</MenuButton>
        <MenuList>
          <MenuButton as="a" href="#test-link">
            Test Link
          </MenuButton>
        </MenuList>
      </Menu>
    );
    fireEvent.click(screen.getByText("Open Menu"));
    const linkItem = screen.getByText("Test Link");
    expect(linkItem.tagName).toBe("A");
    expect(linkItem).toHaveAttribute("href", "#test-link");
  });
});