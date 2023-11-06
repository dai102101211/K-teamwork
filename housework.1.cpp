#include <iostream>
#include <stack>
#include <cmath>
#include <cstring>
#include <stdlib.h>
using namespace std;
stack <char> fu;
stack <double> num;
class polynomial
{
	private:
		string poly;
		double x;
		double result;
	public:
	 polynomial(string p,double xx)
	 {
	 	poly=p;
	 	x=xx;
	 }
	 ~polynomial()
	 {
	 	cout<<result;
	 }
	 void count();
};
void polynomial::count(){
	int len=poly.length();
	string str=poly;
	string number="";
	int j=0;
//	cout<<len;
	for(int i=0;i<len;i++)
	{
		if((str[i]>='0'&&str[i]<='9')||str[i]=='.')
			{
				number=number+str[i];
				//cout<<"num"<<number<<endl;
			}
		else if(str[i]=='x')
		{
			num.push(x);
		//	cout<<"x"<<num.top()<<endl;
		}	
		else if(str[i]!='-')
		{
			int n=number.length();
			if(n>0)
			{
			double x1=atof(number.c_str());
			num.push(x1);
			//cout<<"fu"<<num.top()<<endl;
			number="";
			}
			if(str[i]!='+')
			{
				fu.push(str[i]);
			}
			else if(str[i]=='+')
			{
				double a;
				a=num.top();
				num.pop();
				while(!num.empty())
				{
					double b;
					char c;
					b=num.top();
					//cout<<"b+"<<b<<endl;
					num.pop();
					c=fu.top();
					//cout<<"c+"<<c<<endl;
					fu.pop();
					if(c=='*')
					a=b*a;
					else if(c=='^')
					a=pow(b,a);
					else if(c=='+')
					a=b+a;
					else if(c=='-')
					a=b-a;
				}	
				//cout<<a<<endl;
				num.push(a);
				fu.push(str[i]);
			}
		} 
		else
		{
			if((str[i-1]>='0'&&str[i-1]<='9')||str[i-1]=='x')
			{
				int n=number.length();
				if(n>0)
				{
					double x1=atof(number.c_str());
					num.push(x1);
					//cout<<"fu-"<<num.top()<<endl;
					number="";
				}
			    double a;
				a=num.top();
				//cout<<"a-"<<a<<endl;
				num.pop();
				while(!num.empty())
				{
					double b;
					char c;
					b=num.top();
					//cout<<"b-"<<b<<endl;
					num.pop();
					c=fu.top();
					//cout<<"c-"<<c<<endl;
					fu.pop();
					if(c=='*')
					a=b*a;
					else if(c=='^')
					a=pow(b,a);
					else if(c=='+')
					a=b+a;
					else if(c=='-')
					a=b-a;
				}	
				//cout<<a<<endl;
				num.push(a);
				fu.push(str[i]);
			}
			else
			{
				num.push(-1);
				fu.push('*');
			}
		}
	}
	if(number!="")
	{
		num.push(atof(number.c_str()));
	}
	double a;
	a=num.top();
	//cout<<"a"<<a<<endl;
	num.pop();
	while(!num.empty())
	{
		double b;
		char c;
		b=num.top();
		//cout<<"b"<<b<<endl;
		num.pop();
		c=fu.top();
		//cout<<"c"<<c<<endl;
		fu.pop();
		if(c=='*')
			a=b*a;
		else if(c=='^')
			a=pow(b,a);
		else if(c=='+')
			a=b+a;
		else if(c=='-')
			a=b-a;
	}	
	result=a;
}

int main()
{
	string p;
	double xx;
	cin>>p>>xx;
	polynomial re(p,xx);
	re.count();
	return 0;
}
