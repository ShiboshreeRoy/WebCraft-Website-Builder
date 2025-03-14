import React, { useState } from 'react';
import { useEditorStore } from '../store';
import { ElementType, Product, Review, PaymentMethod } from '../types';
import { Star, Heart, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    salePrice: 169.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'Electronics',
    tags: ['audio', 'wireless', 'premium'],
    inStock: true,
    rating: 4.5,
    reviews: [
      {
        id: '1',
        author: 'John Doe',
        rating: 5,
        content: 'Excellent sound quality and comfort!',
        date: '2024-03-15',
        verified: true,
        helpful: 12
      }
    ]
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking features',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'],
    category: 'Electronics',
    tags: ['wearable', 'smart', 'fitness'],
    inStock: true,
    rating: 4.8
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit Card',
    type: 'card',
    icon: 'credit-card',
    fees: { percentage: 2.9, fixed: 0.30 }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'paypal',
    icon: 'paypal',
    fees: { percentage: 3.4, fixed: 0.30 }
  }
];

const ElementRenderer: React.FC<{ element: ElementType }> = ({ element }) => {
  const setSelectedElement = useEditorStore((state) => state.setSelectedElement);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number }>>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const renderProductGrid = (products: Product[] = defaultProducts) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="mt-3 flex items-center">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-red-600">
                    ${product.salePrice}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price}</span>
              )}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCart = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">-</button>
                  <span>{quantity}</span>
                  <button className="p-1 text-gray-500 hover:text-gray-700">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                ${cartItems.reduce(
                  (total, { product, quantity }) => total + product.price * quantity,
                  0
                ).toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderCheckout = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>{method.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span>
                  {product.name} x {quantity}
                </span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ${cartItems.reduce(
                    (total, { product, quantity }) => total + product.price * quantity,
                    0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-8 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Place Order
      </button>
    </div>
  );

  const renderFAQ = (items = element.props?.faqItems || []) => (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-semibold">{item.question}</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {isExpanded && (
            <div className="px-6 pb-4">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFormFields = (fields: any[] = []) => (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              placeholder={field.placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Submit
      </button>
    </div>
  );

  const renderNavbar = (items: any[] = []) => (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Logo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderFooter = (columns: any[] = []) => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {column.links.map((link: any, linkIndex: number) => (
                  <li key={`${column.id}-${linkIndex}`}>
                    <a
                      href={link.href}
                      className="text-base text-gray-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );

  switch (element.type) {
    case 'productGrid':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderProductGrid(element.props?.products)}
        </div>
      );
    case 'cart':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderCart()}
        </div>
      );
    case 'checkout':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderCheckout()}
        </div>
      );
    case 'faq':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderFAQ()}
        </div>
      );
    case 'heading':
      return (
        <h2
          className={`text-2xl font-bold ${element.props?.className || ''}`}
          onClick={() => setSelectedElement(element)}
        >
          {element.content || 'Heading'}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          className={`my-4 ${element.props?.className || ''}`}
          onClick={() => setSelectedElement(element)}
        >
          {element.content || 'Add your text here'}
        </p>
      );
    case 'image':
      return (
        <img
          src={element.props?.src || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500'}
          alt={element.props?.alt || ''}
          className={`max-w-full ${element.props?.className || ''}`}
          onClick={() => setSelectedElement(element)}
        />
      );
    case 'button':
      return (
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            element.props?.className || ''
          }`}
          onClick={() => setSelectedElement(element)}
        >
          {element.content || 'Click me'}
        </button>
      );
    case 'navbar':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderNavbar(element.props?.navItems)}
        </div>
      );
    case 'footer':
      return (
        <div onClick={() => setSelectedElement(element)}>
          {renderFooter(element.props?.footerColumns)}
        </div>
      );
    case 'form':
    case 'loginForm':
    case 'signupForm':
    case 'contactForm':
      return (
        <div
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
          onClick={() => setSelectedElement(element)}
        >
          {renderFormFields(element.props?.formFields)}
        </div>
      );
    case 'video':
      return (
        <video
          controls
          className={`max-w-full ${element.props?.className || ''}`}
          onClick={() => setSelectedElement(element)}
        >
          <source src={element.props?.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case 'audio':
      return (
        <audio
          controls
          className={`max-w-full ${element.props?.className || ''}`}
          onClick={() => setSelectedElement(element)}
        >
          <source src={element.props?.src} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    case 'container':
      return (
        <div
          className={`p-4 border border-dashed border-gray-300 rounded-lg ${
            element.props?.className || ''
          }`}
          onClick={() => setSelectedElement(element)}
        >
          {element.children?.map((child) => (
            <ElementRenderer key={child.id} element={child} />
          ))}
          {(!element.children || element.children.length === 0) && (
            <div className="text-center text-gray-400 py-8">
              Drag elements here
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

export const Canvas: React.FC = () => {
  const elements = useEditorStore((state) => state.elements);
  const addElement = useEditorStore((state) => state.addElement);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('element_type');
    
    const defaultProps: Record<string, any> = {
      loginForm: {
        formFields: [
          { id: '1', type: 'email', label: 'Email', placeholder: 'Enter your email' },
          { id: '2', type: 'password', label: 'Password', placeholder: 'Enter your password' },
        ],
      },
      signupForm: {
        formFields: [
          { id: '1', type: 'text', label: 'Name', placeholder: 'Enter your name' },
          { id: '2', type: 'email', label: 'Email', placeholder: 'Enter your email' },
          { id: '3', type: 'password', label: 'Password', placeholder: 'Choose a password' },
          { id: '4', type: 'password', label: 'Confirm Password', placeholder: 'Confirm your password' },
        ],
      },
      contactForm: {
        formFields: [
          { id: '1', type: 'text', label: 'Name', placeholder: 'Your name' },
          { id: '2', type: 'email', label: 'Email', placeholder: 'Your email' },
          { id: '3', type: 'textarea', label: 'Message', placeholder: 'Your message' },
        ],
      },
      navbar: {
        navItems: [
          { id: '1', label: 'Home', href: '#' },
          { id: '2', label: 'About', href: '#' },
          { id: '3', label: 'Services', href: '#' },
          { id: '4', label: 'Contact', href: '#' },
        ],
      },
      footer: {
        footerColumns: [
          {
            id: '1',
            title: 'Company',
            links: [
              { label: 'About', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Contact', href: '#' },
            ],
          },
          {
            id: '2',
            title: 'Services',
            links: [
              { label: 'Web Design', href: '#' },
              { label: 'Development', href: '#' },
              { label: 'Marketing', href: '#' },
            ],
          },
          {
            id: '3',
            title: 'Legal',
            links: [
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Security', href: '#' },
            ],
          },
          {
            id: '4',
            title: 'Social',
            links: [
              { label: 'Twitter', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'GitHub', href: '#' },
            ],
          },
        ],
      },
      faq: {
        faqItems: [
          {
            id: '1',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers.',
          },
          {
            id: '2',
            question: 'How long does shipping take?',
            answer: 'Shipping typically takes 3-5 business days for domestic orders.',
          },
          {
            id: '3',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for all unused items.',
          },
        ],
      },
    };

    const newElement: ElementType = {
      id: crypto.randomUUID(),
      type: type as ElementType['type'],
      content: '',
      props: defaultProps[type as keyof typeof defaultProps] || {},
    };
    
    addElement(newElement);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex-1 p-8 min-h-screen bg-gray-100 ml-64"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 min-h-[calc(100vh-4rem)] shadow-lg rounded-lg">
        {elements.map((element) => (
          <ElementRenderer key={element.id} element={element} />
        ))}
        {elements.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            Drag and drop elements here to start building your website
          </div>
        )}
      </div>
    </div>
  );
};