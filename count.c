#include <stdio.h>
#include <stdlib.h>



typedef struct circle{
  int limit;
  int number;
  int shot;
  struct circle *right;
} cir_t;


int main(void){
  cir_t *first, *temp;
  int n, k, curr = 1, l, out = 0;
  scanf("%d %d", &n, &k);
  for(int i = 0; i < n; i++){
    scanf("%d", &l);
    if(i == 0){
      first = (cir_t *)malloc(sizeof(cir_t));
      first->limit = l;
      first->shot = 0;
      first->number = i + 1;
      temp = first;
    }
    else if(i == (n -1)){
      temp->right = (cir_t *)malloc(sizeof(cir_t));
      temp = temp->right;
      temp->right = first;
      temp->number = i + 1;
      temp->shot = 0;
      temp->limit = l;
    }
    else if(i > 0){
      temp->right = (cir_t *)malloc(sizeof(cir_t));
      temp = temp->right;
      temp->limit = l;
      temp->number = i + 1;
      temp->shot = 0;
    }
  }

  while(1){
    if((n - out) == 1){
      if(first->shot <= first->limit){
        printf("%d", first->number);
        break;
      } 
      else{
        first = first->right;
      }
    }
    else{
      if(first->shot <= first->limit){
        if(curr % k == 0){
          first->shot += 1;
          if(first->shot > first->limit){
            out += 1;
          }
          curr += 1;
        }
        else{
          curr += 1;
        }
      } 
      else{
        
      }
      first = first->right;
      
    }
  }

  


  
}
