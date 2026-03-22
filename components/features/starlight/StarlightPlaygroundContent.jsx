'use client';

import { CopyIcon, SquareMIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { GeneratedImagePreview } from '@/components/features/starlight/GeneratedImagePreview';
import { CopyButton } from '@/components/features/starlight/CopyButton';
import { cn } from '@/lib/utils';

const TABS_CONFIG = {
  source: [
    {
      id: 'username',
      label: 'Username',
      placeholder: 'WebStray',
      description: 'Your GitHub username.',
      type: 'input',
    },
    {
      id: 'repository',
      label: 'Repository',
      placeholder: 'Starlight',
      description: 'Your GitHub repository.',
      type: 'input',
    },
  ],
  layout: [
    {
      id: 'customTitle',
      label: 'Custom Title',
      placeholder: 'Other Repository',
      description: 'Custom repository title.',
      type: 'input',
    },
    {
      id: 'borderRadius',
      label: 'Border Radius',
      placeholder: '40',
      description: 'Custom border radius.',
      type: 'input',
      addon: 'px',
    },
  ],
  theme: [
    { id: 'lightTheme', title: 'Light Theme', description: 'Apply light theme.', type: 'switch' },
    {
      id: 'styledProgress',
      title: 'Styled Language Bar',
      description: 'Apply styled bar.',
      type: 'switch',
    },
  ],
  details: [
    {
      id: 'singleLanguage',
      title: 'Single Language',
      description: 'Show main language.',
      type: 'switch',
    },
    {
      id: 'sharpProgress',
      title: 'Sharp Progress Bar',
      description: 'Apply sharp bar.',
      type: 'switch',
    },
  ],
};

export const StarlightPlaygroundContent = ({
  drawerMode = false,
  onRender,
  onImageLoaded,
  ...stateProps
}) => {
  const { activeTab, onTabChange, isRendering, renderedUrl, imageGenerated, form } = stateProps;

  const { formData, isValid, finalUrl, copiedField, handleCopy, handleUpdate } = form;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isRendering && isValid) {
      e.preventDefault();
      onRender();
    }
  };

  const renderField = (field) => {
    const value = formData[field.id] || (field.type === 'input' ? '' : false);

    if (field.type === 'input') {
      const inputProps = {
        id: field.id,
        value: value,
        placeholder: field.placeholder,
        onChange: (e) => handleUpdate(field.id, e.target.value),
        className: 'text-sm',
      };

      return (
        <div className="flex flex-col gap-2" key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>

          {field.addon ? (
            <InputGroup>
              <InputGroupInput {...inputProps} />
              <InputGroupAddon align="inline-end">{field.addon}</InputGroupAddon>
            </InputGroup>
          ) : (
            <Input {...inputProps} />
          )}

          <p className="text-muted-foreground">{field.description}</p>
        </div>
      );
    }

    return (
      <FieldLabel htmlFor={field.id} key={field.id}>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{field.title}</FieldTitle>
            <FieldDescription>{field.description}</FieldDescription>
          </FieldContent>
          <Switch
            id={field.id}
            checked={value}
            onCheckedChange={(checked) => handleUpdate(field.id, checked)}
          />
        </Field>
      </FieldLabel>
    );
  };

  return (
    <div onKeyDown={handleKeyDown} className={cn('flex flex-col gap-3', drawerMode && 'px-4')}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="gap-4">
        <TabsList variant="line" className="w-full px-0">
          {['source', 'layout', 'theme', 'details', 'preview'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="relative capitalize">
              {tab === 'preview' && imageGenerated && (
                <span className="size-1.5 rounded-full bg-blue-500" />
              )}
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(TABS_CONFIG).map(([tabName, fields]) => (
          <TabsContent key={tabName} value={tabName} className="flex flex-col gap-3">
            {fields.map(renderField)}
          </TabsContent>
        ))}

        <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
          <GeneratedImagePreview
            url={renderedUrl}
            isRendering={isRendering}
            onLoad={onImageLoaded}
          />
        </TabsContent>

        <div className="flex flex-col gap-2">
          <Label htmlFor="api-url">API URL</Label>
          <InputGroup>
            <InputGroupInput
              id="api-url"
              value={finalUrl}
              readOnly
              className="text-muted-foreground text-sm select-all"
            />
            <InputGroupAddon align="inline-end" className="gap-1">
              <CopyButton
                active={copiedField === 'url'}
                onCopy={() => handleCopy(finalUrl, 'url')}
                icon={<CopyIcon />}
                tooltip="Copy URL"
              />
              <CopyButton
                active={copiedField === 'md'}
                onCopy={() => handleCopy(`![Repository Preview](${finalUrl})`, 'md')}
                icon={<SquareMIcon />}
                tooltip="Copy Markdown"
              />
            </InputGroupAddon>
          </InputGroup>
          <p className="text-muted-foreground">Link to generated image.</p>
        </div>
      </Tabs>
    </div>
  );
};
