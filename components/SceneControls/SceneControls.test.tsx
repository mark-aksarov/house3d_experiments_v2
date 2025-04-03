import SceneControls from "components/SceneControls";
import createMatchMedia from "@/utils/createMatchMedia";
import { fireEvent, screen } from "@testing-library/react";
import { render, mockedCamera, mockedRenderer } from '@/utils/test-utils';

describe('SceneControls', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it('should render scene control buttons', () => {
    render(<SceneControls />);

    const zoomIn = screen.getAllByRole("button", { name: /zoom in/i });
    const zoomOut = screen.getAllByRole("button", { name: /zoom out/i });
    const resetZoom = screen.getAllByRole("button", { name: /reset zoom/i });

    expect(zoomIn[0]).toBeInTheDocument();
    expect(zoomOut[0]).toBeInTheDocument();
    expect(resetZoom[0]).toBeInTheDocument();
  });

  it('should zoom in', () => {
    render(<SceneControls />);

    const zoomIn = screen.getAllByRole("button", { name: /zoom in/i });
    mockedCamera.updateProjectionMatrix.mockClear();
    mockedRenderer.render.mockClear();
    fireEvent.click(zoomIn[0]);

    expect(mockedCamera.updateProjectionMatrix).toHaveBeenCalledTimes(1);
    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
  });

  it('should zoom out', () => {
    render(<SceneControls />);

    const zoomOut = screen.getAllByRole("button", { name: /zoom out/i });
    mockedCamera.updateProjectionMatrix.mockClear();
    mockedRenderer.render.mockClear();
    fireEvent.click(zoomOut[0]);

    expect(mockedCamera.updateProjectionMatrix).toHaveBeenCalledTimes(1);
    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
  });

  it('should reset zoom', () => {
    render(<SceneControls />);

    const resetZoom = screen.getAllByRole("button", { name: /reset zoom/i });
    mockedCamera.updateProjectionMatrix.mockClear();
    mockedRenderer.render.mockClear();
    fireEvent.click(resetZoom[0]);

    expect(mockedCamera.updateProjectionMatrix).toHaveBeenCalledTimes(1);
    expect(mockedRenderer.render).toHaveBeenCalledTimes(1);
  });
});