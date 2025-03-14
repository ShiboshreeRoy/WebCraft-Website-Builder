import React from 'react';
import { useEditorStore } from '../store';
import { FormField, NavItem, FooterColumn } from '../types';

export const PropertyPanel: React.FC = () => {
  const selectedElement = useEditorStore((state) => state.selectedElement);
  const updateElement = useEditorStore((state) => state.updateElement);

  if (!selectedElement) {
    return null;
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(selectedElement.id, { content: e.target.value });
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(selectedElement.id, {
      props: { ...selectedElement.props, className: e.target.value },
    });
  };

  const handleFormFieldChange = (index: number, field: Partial<FormField>) => {
    const formFields = [...(selectedElement.props?.formFields || [])];
    formFields[index] = { ...formFields[index], ...field };
    updateElement(selectedElement.id, {
      props: { ...selectedElement.props, formFields },
    });
  };

  const handleNavItemChange = (index: number, item: Partial<NavItem>) => {
    const navItems = [...(selectedElement.props?.navItems || [])];
    navItems[index] = { ...navItems[index], ...item };
    updateElement(selectedElement.id, {
      props: { ...selectedElement.props, navItems },
    });
  };

  const handleFooterColumnChange = (index: number, column: Partial<FooterColumn>) => {
    const footerColumns = [...(selectedElement.props?.footerColumns || [])];
    footerColumns[index] = { ...footerColumns[index], ...column };
    updateElement(selectedElement.id, {
      props: { ...selectedElement.props, footerColumns },
    });
  };

  const renderFormFieldsEditor = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Form Fields</h4>
      {selectedElement.props?.formFields?.map((field: FormField, index: number) => (
        <div key={field.id} className="space-y-2">
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleFormFieldChange(index, { label: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Field Label"
          />
          <input
            type="text"
            value={field.placeholder}
            onChange={(e) =>
              handleFormFieldChange(index, { placeholder: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Placeholder"
          />
        </div>
      ))}
    </div>
  );

  const renderNavItemsEditor = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Navigation Items</h4>
      {selectedElement.props?.navItems?.map((item: NavItem, index: number) => (
        <div key={item.id} className="space-y-2">
          <input
            type="text"
            value={item.label}
            onChange={(e) => handleNavItemChange(index, { label: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Link Label"
          />
          <input
            type="text"
            value={item.href}
            onChange={(e) => handleNavItemChange(index, { href: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Link URL"
          />
        </div>
      ))}
    </div>
  );

  const renderFooterEditor = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Footer Columns</h4>
      {selectedElement.props?.footerColumns?.map((column: FooterColumn, index: number) => (
        <div key={column.id} className="space-y-2">
          <input
            type="text"
            value={column.title}
            onChange={(e) =>
              handleFooterColumnChange(index, { title: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Column Title"
          />
          {column.links.map((link, linkIndex) => (
            <div key={linkIndex} className="flex space-x-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...column.links];
                  newLinks[linkIndex] = {
                    ...link,
                    label: e.target.value,
                  };
                  handleFooterColumnChange(index, { links: newLinks });
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Link Label"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => {
                  const newLinks = [...column.links];
                  newLinks[linkIndex] = {
                    ...link,
                    href: e.target.value,
                  };
                  handleFooterColumnChange(index, { links: newLinks });
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="URL"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed right-0 top-20 bottom-0 bg-white p-4 shadow-lg rounded-l-lg w-80 overflow-y-auto">
      <h3 className="font-bold mb-4">Properties</h3>
      <div className="space-y-6">
        {['heading', 'paragraph', 'button'].includes(selectedElement.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <input
              type="text"
              value={selectedElement.content || ''}
              onChange={handleContentChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        )}
        
        {['image', 'video', 'audio'].includes(selectedElement.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Source URL
            </label>
            <input
              type="text"
              value={selectedElement.props?.src || ''}
              onChange={(e) =>
                updateElement(selectedElement.id, {
                  props: { ...selectedElement.props, src: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            CSS Classes
          </label>
          <input
            type="text"
            value={selectedElement.props?.className || ''}
            onChange={handleClassChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {['loginForm', 'signupForm', 'contactForm', 'form'].includes(
          selectedElement.type
        ) && renderFormFieldsEditor()}

        {selectedElement.type === 'navbar' && renderNavItemsEditor()}

        {selectedElement.type === 'footer' && renderFooterEditor()}
      </div>
    </div>
  );
};