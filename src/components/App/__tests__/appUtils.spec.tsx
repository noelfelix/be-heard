import { shallow } from 'enzyme'
import globals from 'const/globals'
import documentUtils from 'utils/document'
import { THEME } from 'utils/theme'
import { renderCustomStylesheet, renderDevFlag, toggleRootClassStyle } from '../appUtils'

describe('appUtils', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('renderDevFlag()', () => {
    it('should return false when isLocal is false', () => {
      jest.spyOn(globals, 'isLocal').mockImplementation(() => false)
      expect(renderDevFlag()).toBe(false)
    })

    it('should render Link when isLocal is true', () => {
      jest.spyOn(globals, 'isLocal').mockImplementation(() => true)
      const wrapper = shallow(renderDevFlag() as any)
      expect(wrapper.debug()).toMatchSnapshot()
    })
  })

  describe('toggleRootClassStyle()', () => {
    it('should return undefined when root is undefined', () => {
      jest.spyOn(documentUtils, 'getElementById').mockImplementation(() => undefined as any)
      expect(toggleRootClassStyle(THEME.DARK)).toBeUndefined()
    })

    it('should add dark theme and remove others when dark theme passed in', () => {
      const root = {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      }
      jest.spyOn(documentUtils, 'getElementById').mockImplementation(() => root as any)
      toggleRootClassStyle(THEME.DARK)
      expect(root.classList.add).toHaveBeenCalledWith('root--theme-dark')
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-light')
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-custom')
    })

    it('should add light theme and remove others when light theme passed in', () => {
      const root = {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      }
      jest.spyOn(documentUtils, 'getElementById').mockImplementation(() => root as any)
      toggleRootClassStyle(THEME.LIGHT)
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-dark')
      expect(root.classList.add).toHaveBeenCalledWith('root--theme-light')
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-custom')
    })

    it('should add custom theme and remove others when custom theme passed in', () => {
      const root = {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      }
      jest.spyOn(documentUtils, 'getElementById').mockImplementation(() => root as any)
      toggleRootClassStyle(THEME.CUSTOM)
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-dark')
      expect(root.classList.remove).toHaveBeenCalledWith('root--theme-light')
      expect(root.classList.add).toHaveBeenCalledWith('root--theme-custom')
    })
  })

  describe('renderCustomStylesheet()', () => {
    it('should return null when no skinParams', () => {
      expect(renderCustomStylesheet()).toBeNull()
    })

    it('should return an object when has skinParams', () => {
      expect(renderCustomStylesheet({} as any)).toBeDefined()
    })
  })
})
