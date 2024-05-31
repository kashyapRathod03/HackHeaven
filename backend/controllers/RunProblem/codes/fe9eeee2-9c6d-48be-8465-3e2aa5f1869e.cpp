#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) { 
 //write here 
 unordered_map<int, int> numIndexMap;
    vector<int> result;
    
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (numIndexMap.find(complement) != numIndexMap.end()) {
            result.push_back(numIndexMap[complement]);
            result.push_back(i);
            break;
        }
        numIndexMap[nums[i]] = i;
    }
    
    return result;
}int main(){vector<pair<vector<int>,int>>testCases={{ {2,7,11,15},9},{ {3,2,4},6},{ {3,3},6}};cout<<"["<<endl;for(auto&testCase:testCases){auto&nums=testCase.first;int target=testCase.second;vector<int>indices=twoSum(nums,target); cout<<"[";for(int i=0;i<indices.size();++i){cout<<indices[i];if(i<indices.size()-1){cout<<",";}}cout<<"]";cout<<","<<endl;} cout<<"]"; return 0;}