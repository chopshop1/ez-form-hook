import { ComplexFormComponent } from './components/ComplexFormComponent';
import { MassRenderComponent } from './components/MassRenderComponent';
import { MultiFormComponent } from './components/MultiFormComponent';
import { SimpleUseComponent } from './components/SimpleUseComponent';
import { ViewModeComponent } from './components/ViewModeComponent';
import { UniformWithinUniformComponent } from './components/UniformWithinUniformComponent';

export default {
  title: 'Uniform Hook Examples',
};

export const simpleUse = () => SimpleUseComponent()

export const massRender = () => MassRenderComponent()

export const viewMode = () => ViewModeComponent()

export const complexForm = () => ComplexFormComponent()

export const multiFormExample = () => MultiFormComponent()

export const UniformWithinUniform = () => UniformWithinUniformComponent()