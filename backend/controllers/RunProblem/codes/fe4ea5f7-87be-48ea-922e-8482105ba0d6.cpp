#include <bits/stdc++.h>
using namespace std;

 bool isPalindrome(int x) { 
 //write here 
  if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    int reversedNumber = 0, originalNumber = x;
    while (x > 0) {
        int digit = x % 10;
        reversedNumber = reversedNumber * 10 + digit;
        x /= 10;
    }
    return originalNumber == reversedNumber;
}int main(){vector<int> testCases={121,-121,10};cout<<"[";for(int i=0;i<testCases.size();++i){int number=testCases[i];bool result=isPalindrome(number);cout<<(result?"true":"false");if(i<testCases.size()-1) cout<<",";}cout<<"]"<<endl;return 0;}