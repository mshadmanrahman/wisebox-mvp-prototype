import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type AuthStep = 'login' | 'signup' | 'verify' | 'reset-password';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("shadman@gmail.com");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(299); // 04:59 in seconds
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  // Demo testimonials data
  const testimonials = [
    {
      location: "Toronto, Canada",
      quote: "WiseBox has truly transformed how I manage my family properties back in Bangladesh. Now, from the comfort of living room in NYC, I can effortlessly keep track of all my important documents and transactions.",
      name: "Sharmin Rahman",
      title: "Accounting Professional",
      image: "/lovable-uploads/700c333f-a1db-4af2-9c3e-e303806cc5f0.png"
    },
    {
      location: "New York, USA", 
      quote: "Using WiseBox has truly simplified the management of my family properties in Bangladesh. I can effortlessly monitor all my documents and transactions right from Toronto.",
      name: "Badhan Mazumdar",
      title: "Software Engineer",
      image: "/lovable-uploads/e38c16d8-5fc9-47cc-8d85-942e9e136f29.png"
    },
    {
      location: "Birmingham, UK",
      quote: "WiseBox has completely changed the game for managing my family's estate in Sylhet. From my cozy apartment in Birmingham, I can easily oversee all my vital paperwork and financial dealings without a hitch.",
      name: "Sharmin Rahman", 
      title: "Accounting Professional",
      image: "/lovable-uploads/e38c16d8-5fc9-47cc-8d85-942e9e136f29.png"
    },
    {
      location: "Sydney, Australia",
      quote: "As a grandfather, I find great comfort in knowing that WiseBox allows me to manage our family's properties in Bangladesh from my home in Toronto. I can easily keep track of all the important documents and transactions, ensuring that my children and grandchildren will inherit not just assets, but also the wisdom and guidance they need to navigate their future.",
      name: "Enayet Chowdhury",
      title: "Retd. Physician", 
      image: "/lovable-uploads/f823bd09-3741-48e7-813d-25ddf4c7d909.png"
    }
  ];

  const currentTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your account.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('verify');
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.some(code => code === '')) {
      toast({
        title: "Incomplete code",
        description: "Please enter the complete verification code",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Account verified!",
      description: "Your account has been successfully verified.",
    });
    navigate("/dashboard");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const renderMobileLayout = () => {
    switch (currentStep) {
      case 'login':
        return (
          <div className="min-h-screen bg-background text-foreground p-6 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-8">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">Wisebox</span>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Log in to Your Account</h1>
                  <p className="text-muted-foreground">Enter your email below to login to your account.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password" className="text-foreground">Password</Label>
                      <button
                        type="button"
                        onClick={() => setCurrentStep('reset-password')}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Login"}
                  </Button>
                </form>

                <div className="text-center text-muted-foreground">Or continue with</div>

                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  Login with Google
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <button
                    onClick={() => setCurrentStep('signup')}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2025 WiseBox. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                  <button className="text-primary hover:underline">Privacy Policy</button>
                  <button className="text-primary hover:underline">Terms of Service</button>
                  <button className="text-primary hover:underline">Help Center</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'signup':
        return (
          <div className="min-h-screen bg-background text-foreground p-6 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-8">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">Wisebox</span>
              </div>

              {/* Signup Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h1>
                  <p className="text-muted-foreground">Start digitizing your inherited land records today.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">Full name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-foreground">Country of residency</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="bg-card border-border text-foreground">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="bd">Bangladesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <button type="button" className="text-primary hover:underline">Terms of Service</button>
                      {' '}and{' '}
                      <button type="button" className="text-primary hover:underline">Privacy Policy</button>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Create Account
                  </Button>
                </form>

                <div className="text-center text-muted-foreground">Or continue with</div>

                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  Continue with Google
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <button
                    onClick={() => setCurrentStep('login')}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2025 WiseBox. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                  <button className="text-primary hover:underline">Privacy Policy</button>
                  <button className="text-primary hover:underline">Terms of Service</button>
                  <button className="text-primary hover:underline">Help Center</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'verify':
        return (
          <div className="min-h-screen bg-background text-foreground p-6 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-8">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">Wisebox</span>
              </div>

              {/* Verification Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Verify Your Account</h1>
                  <p className="text-muted-foreground">
                    We've sent a verification code to {email}. Please enter the code below to complete your registration.
                  </p>
                </div>

                <form onSubmit={handleVerification} className="space-y-6">
                  {/* 4-digit code input */}
                  <div className="flex justify-center space-x-3">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeInput(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-semibold bg-card border-border"
                      />
                    ))}
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Code expires in {formatTime(timeLeft)}
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Verify & Continue
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{' '}
                    <button className="text-primary hover:underline">Resend Code</button>
                  </p>
                  <p className="text-sm text-muted-foreground">Having trouble with email verification?</p>
                  <button className="text-primary hover:underline flex items-center justify-center mx-auto">
                    <Phone className="h-4 w-4 mr-2" />
                    Try phone verification instead
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2025 WiseBox. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                  <button className="text-primary hover:underline">Privacy Policy</button>
                  <button className="text-primary hover:underline">Terms of Service</button>
                  <button className="text-primary hover:underline">Help Center</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reset-password':
        return (
          <div className="min-h-screen bg-background text-foreground p-6 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-8">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">Wisebox</span>
              </div>

              {/* Reset Password Form */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Reset Your Password</h1>
                  <p className="text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetEmail" className="text-foreground">Email</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-card border-border text-foreground"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Reset Link
                  </Button>
                </form>

                <div className="text-center">
                  <span className="text-muted-foreground">Remember your password? </span>
                  <button
                    onClick={() => setCurrentStep('login')}
                    className="text-primary hover:underline"
                  >
                    Back to log in
                  </button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Need help?</p>
                  <p className="text-sm text-muted-foreground">Contact our support team</p>
                  <button className="text-primary hover:underline flex items-center justify-center mx-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2025 WiseBox. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                  <button className="text-primary hover:underline">Privacy Policy</button>
                  <button className="text-primary hover:underline">Terms of Service</button>
                  <button className="text-primary hover:underline">Help Center</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderDesktopLayout = () => {
    switch (currentStep) {
      case 'login':
        return (
          <div className="min-h-screen bg-background flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-semibold text-foreground">Wisebox</span>
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Log in to Your Account</h1>
                    <p className="text-muted-foreground">Enter your email below to login to your account.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-card border-border text-foreground"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password" className="text-foreground">Password</Label>
                        <button
                          type="button"
                          onClick={() => setCurrentStep('reset-password')}
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-card border-border text-foreground"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Login"}
                    </Button>
                  </form>

                  <div className="text-center text-muted-foreground">Or continue with</div>

                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                    Login with Google
                  </Button>

                  <div className="text-center">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <button
                      onClick={() => setCurrentStep('signup')}
                      className="text-primary hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground space-y-2">
                  <p>© 2025 WiseBox. All rights reserved.</p>
                  <div className="flex justify-center space-x-4">
                    <button className="text-primary hover:underline">Privacy Policy</button>
                    <button className="text-primary hover:underline">Terms of Service</button>
                    <button className="text-primary hover:underline">Help Center</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Testimonial */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="h-full flex flex-col">
                {/* Location Badge */}
                <div className="p-6 flex justify-end">
                  <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Building className="h-3 w-3 mr-2" />
                    {currentTestimonial.location}
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${currentTestimonial.image})` }} />

                {/* Testimonial */}
                <div className="bg-gradient-to-t from-primary/90 to-primary/70 text-white p-8">
                  <div className="mb-4">
                    <div className="text-4xl font-bold mb-2">❝</div>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">{currentTestimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{currentTestimonial.name}</p>
                    <p className="text-sm text-white/80">{currentTestimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Similar patterns for other steps...
      default:
        return renderMobileLayout();
    }
  };

  // Responsive check - simplified for this example
  const isMobile = window.innerWidth < 768;

  return isMobile ? renderMobileLayout() : renderDesktopLayout();
};

export default Auth;