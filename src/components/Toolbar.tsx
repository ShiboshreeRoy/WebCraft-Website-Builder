import React from 'react';
import {
  Type,
  Image,
  Square,
  MousePointer,
  Navigation,
  FilterIcon as FooterIcon,
  FormInput,
  Video,
  Music,
  LogIn,
  UserPlus,
  Mail,
  LayoutGrid,
  ShoppingBag,
  FileText,
  MessageSquare,
  CreditCard,
  Image as GalleryIcon,
  HelpCircle,
  Mail as NewsletterIcon,
  Layers,
  PenTool,
  ShoppingCart,
  CreditCard as PaymentIcon,
  Truck,
  Filter,
  Heart,
  Star,
} from 'lucide-react';
import { useEditorStore } from '../store';

const tools = [
  // Layout Components
  { id: 'container', icon: LayoutGrid, label: 'Container', category: 'Layout' },
  { id: 'hero', icon: Layers, label: 'Hero Section', category: 'Layout' },
  { id: 'navbar', icon: Navigation, label: 'Navigation', category: 'Layout' },
  { id: 'footer', icon: FooterIcon, label: 'Footer', category: 'Layout' },

  // Basic Elements
  { id: 'heading', icon: Type, label: 'Heading', category: 'Basic' },
  { id: 'paragraph', icon: Square, label: 'Paragraph', category: 'Basic' },
  { id: 'button', icon: MousePointer, label: 'Button', category: 'Basic' },
  { id: 'image', icon: Image, label: 'Image', category: 'Media' },

  // Media Elements
  { id: 'gallery', icon: GalleryIcon, label: 'Gallery', category: 'Media' },
  { id: 'video', icon: Video, label: 'Video', category: 'Media' },
  { id: 'audio', icon: Music, label: 'Audio', category: 'Media' },

  // E-commerce Components
  { id: 'productGrid', icon: ShoppingBag, label: 'Product Grid', category: 'E-commerce' },
  { id: 'productCard', icon: CreditCard, label: 'Product Card', category: 'E-commerce' },
  { id: 'pricing', icon: CreditCard, label: 'Pricing Table', category: 'E-commerce' },
  { id: 'cart', icon: ShoppingCart, label: 'Shopping Cart', category: 'E-commerce' },
  { id: 'checkout', icon: CreditCard, label: 'Checkout', category: 'E-commerce' },
  { id: 'paymentForm', icon: PaymentIcon, label: 'Payment Form', category: 'E-commerce' },
  { id: 'orderSummary', icon: FileText, label: 'Order Summary', category: 'E-commerce' },
  { id: 'shippingForm', icon: Truck, label: 'Shipping Form', category: 'E-commerce' },
  { id: 'productFilter', icon: Filter, label: 'Product Filter', category: 'E-commerce' },
  { id: 'wishlist', icon: Heart, label: 'Wishlist', category: 'E-commerce' },
  { id: 'reviews', icon: Star, label: 'Reviews', category: 'E-commerce' },

  // Content Components
  { id: 'blogPost', icon: FileText, label: 'Blog Post', category: 'Content' },
  { id: 'testimonial', icon: MessageSquare, label: 'Testimonial', category: 'Content' },
  { id: 'faq', icon: HelpCircle, label: 'FAQ', category: 'Content' },

  // Forms
  { id: 'form', icon: FormInput, label: 'Custom Form', category: 'Forms' },
  { id: 'loginForm', icon: LogIn, label: 'Login Form', category: 'Forms' },
  { id: 'signupForm', icon: UserPlus, label: 'Signup Form', category: 'Forms' },
  { id: 'contactForm', icon: Mail, label: 'Contact Form', category: 'Forms' },
  { id: 'newsletter', icon: NewsletterIcon, label: 'Newsletter', category: 'Forms' },
];

const categories = ['Layout', 'Basic', 'Media', 'E-commerce', 'Content', 'Forms'];

export const Toolbar: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('Layout');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('element_type', type);
  };

  const filteredTools = tools.filter(
    (tool) =>
      tool.category === activeCategory &&
      (searchTerm === '' ||
        tool.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed left-0 top-20 bottom-0 bg-white p-4 shadow-lg rounded-r-lg w-64 overflow-y-auto">
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              draggable
              onDragStart={(e) => handleDragStart(e, tool.id)}
              className="flex flex-col items-center p-3 cursor-move hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
            >
              <tool.icon className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-xs text-center">{tool.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};