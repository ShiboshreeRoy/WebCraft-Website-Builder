export interface ElementType {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'container' | 'navbar' | 'footer' | 'form' | 'video' | 'audio' | 'loginForm' | 'signupForm' | 'contactForm' | 'productGrid' | 'productCard' | 'blogPost' | 'testimonial' | 'pricing' | 'hero' | 'gallery' | 'faq' | 'newsletter' | 'cart' | 'checkout' | 'paymentForm' | 'orderSummary' | 'shippingForm' | 'productFilter' | 'wishlist' | 'reviews';
  content?: string;
  children?: ElementType[];
  props?: {
    className?: string;
    src?: string;
    alt?: string;
    formFields?: FormField[];
    navItems?: NavItem[];
    footerColumns?: FooterColumn[];
    products?: Product[];
    blogPosts?: BlogPost[];
    testimonials?: Testimonial[];
    pricingPlans?: PricingPlan[];
    galleryImages?: GalleryImage[];
    faqItems?: FAQItem[];
    theme?: ThemeSettings;
    paymentMethods?: PaymentMethod[];
    shippingMethods?: ShippingMethod[];
    orderDetails?: OrderDetails;
    [key: string]: any;
  };
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  elements: ElementType[];
  category: 'ecommerce' | 'blog' | 'business' | 'portfolio' | 'landing';
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'number' | 'tel' | 'url' | 'card' | 'cardExpiry' | 'cardCvc';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: { label: string; href: string }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  variants?: ProductVariant[];
  reviews?: Review[];
  rating?: number;
  specifications?: Record<string, string>;
  shippingInfo?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    freeShipping?: boolean;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  attributes: Record<string, string>;
  stock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  images?: string[];
  helpful: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'paypal' | 'bank' | 'crypto';
  icon: string;
  fees?: {
    percentage: number;
    fixed: number;
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  price: number;
  estimatedDays: number;
  tracking: boolean;
}

export interface OrderDetails {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
  };
  spacing: {
    containerWidth: string;
    gap: string;
    padding: string;
  };
  borderRadius: string;
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface SiteSettings {
  name: string;
  logo?: string;
  favicon?: string;
  description?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}